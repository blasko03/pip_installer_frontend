'use client'
import { type ReactElement, useEffect, useState } from 'react'
import Selector from './selector'
import { type IServer } from '../../types/i_server'
import _servers from '../../config/servers.json'
import _packages from '../../config/packages.json'
import { installPackage } from './install_package'
import { type IResponseData } from '@/pages/api/install'
import InstallResponse from './install_response'
import { ascendingOrder } from '../utils/ascendingOrder'
import { type IKeyEvent } from '@/types/i_key_event'

export default function Phases ({ event }: { event: IKeyEvent }): ReactElement {
  const servers: IServer[] = _servers.sort(function (a: IServer, b: IServer) {
    return ascendingOrder(a.name, b.name)
  })
  const packages: string[] = _packages.sort(ascendingOrder)
  const [selectedServer, setSelectedServer] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState(0)
  const [selectedConfirmation, setSelectedConfirmation] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [response, setResponse] = useState<IResponseData | undefined>(undefined)

  const phases = [
    { update: setSelectedServer, selection: selectedServer, elements: servers.map(x => x.name), name: 'servers', title: 'Select server' },
    { update: setSelectedPackage, selection: selectedPackage, elements: packages, name: 'packages', title: 'Select package' },
    { update: setSelectedConfirmation, selection: selectedConfirmation, elements: ['YES', 'NO'], name: 'confirmation', confirmation: true, title: 'Confirm' }
  ]

  const eventAction = (event: IKeyEvent): void => {
    if (event.action === 'up') {
      phases[currentPhase].update(s => Math.max(s - 1, 0))
    }
    if (event.action === 'down') {
      phases[currentPhase].update(s => Math.min(s + 1, phases[currentPhase].elements.length - 1))
    }
    if (event.action === 'enter') {
      if (phases[currentPhase].confirmation === true && selectedConfirmation === 0 && response === undefined) {
        void installPackage(packages[selectedPackage], servers[selectedServer], setResponse)
      } else {
        setCurrentPhase(p => (p + 1) % phases.length)
        setResponse(undefined)
      }
    }
  }

  useEffect(() => {
    eventAction(event)
  }, [event])

  return (
    <>
      {
        phases.map((phase, index) => <Selector key = {phase.name}
                                               list = {phase.elements}
                                               selected = {phase.selection}
                                               title = {phase.title}
                                               active = {index === currentPhase} />)
      }
      <InstallResponse response={response} event={event} />
    </>
  )
}
