'use client';
import { useEffect, useMemo, useState } from 'react';
import Selector from './selector'
import { IServer } from '../../types/i_server';
import _servers from '../../config/servers.json'
import _models from '../../config/models.json'
import { installModel } from './install_model';
import { IResponseData } from '@/pages/api/install';
import InstallResponse from './install_response';

interface KeyboardEvent {
  key: string;
}

export default function Selection() {
  const servers: IServer[] = _servers
  const models: string[] = _models
  const [selectedServer, setSelectedServer] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedConfirmation, setSelectedConfirmation] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [response, setResponse] = useState<IResponseData | undefined>(undefined);
  const [scrolled, setScrolled] = useState<any>({direction: 'up'});

  const phases = useMemo(() => [
    { update: setSelectedServer, selection: selectedServer, elements: servers.map (x => x.name), name: "servers", title: 'Seleziona server' },
    { update: setSelectedModel, selection: selectedModel, elements: models, name: "models", title: 'Seleziona modello' },
    { update: setSelectedConfirmation, selection: selectedConfirmation, elements: ['YES', 'NO'], name: "confirmation", confirmation: true, title: 'Confermi' },
  ], [servers, models, selectedConfirmation, selectedModel, selectedServer])

  useEffect(() => {
    function handleKeyDown(this: Document, ev: KeyboardEvent): any{
      if(['ArrowUp', 'a'].includes(ev.key)){
        phases[currentPhase].update(s => Math.max(s-1, 0))
        setScrolled({direction: 'up'})
      }
      if(['ArrowDown', 'c'].includes(ev.key)){
        phases[currentPhase].update(s => Math.min(s+1, phases[currentPhase].elements.length-1))
        setScrolled({direction: 'down'})
      }
      if(['Enter', 'b'].includes(ev.key)){
        if(phases[currentPhase].confirmation == true && selectedConfirmation == 0 && response === undefined) {
            installModel(models[selectedModel], servers[selectedServer], setResponse)
        }
        else{
            setCurrentPhase(p => (p + 1) % phases.length)
            setResponse(undefined)
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [servers, response, models, phases, currentPhase, selectedConfirmation, selectedModel, selectedServer]);

  return (
    <>
      { 
        phases.map ( (phase, index) => <Selector key = {phase.name}
                                                 list = {phase.elements}
                                                 selected = {phase.selection}
                                                 title = {phase.title}
                                                 active = {index==currentPhase} /> ) 
      }
      <InstallResponse response={response} scrolled={scrolled} />
    </>
  )
}
