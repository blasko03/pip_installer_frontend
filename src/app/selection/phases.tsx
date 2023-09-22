'use client'
import { type ReactElement, useEffect, useState } from 'react'
import Selector from './selector'
import { type IServer } from '../../types/i_server'
import { installPackage } from './install_package'
import { type IResponseData } from '@/pages/api/install'
import InstallResponse from './install_response'
import { type IKeyEvent } from '@/types/i_key_event'

export default function Phases ({ event, servers, packages }: { event: IKeyEvent, servers: IServer[], packages: string[] }): ReactElement {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [response, setResponse] = useState<IResponseData | undefined>(undefined)
  const [phaseStatus, setPhaseStatus] = useState([0, 0, 0])

  const phases = [
    { elements: servers.map(x => x.name), name: 'servers', title: 'Select server' },
    { elements: packages, name: 'packages', title: 'Select package' },
    { elements: ['YES', 'NO'], name: 'confirmation', confirmation: true, title: 'Confirm' }
  ]

  const eventAction = (event: IKeyEvent): void => {
    if (event.action === 'up') {
      setPhaseStatus(status => status.map((x, i) => i === currentPhase ? Math.max(x - 1, 0) : x))
    }
    if (event.action === 'down') {
      setPhaseStatus(status => status.map((x, i) => i === currentPhase ? Math.min(x + 1, phases[currentPhase].elements.length - 1) : x))
    }
    if (event.action === 'enter') {
      if (phases[currentPhase].confirmation === true && phaseStatus[2] === 0 && response === undefined) {
        void installPackage(packages[phaseStatus[1]], servers[phaseStatus[0]], setResponse)
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
                                               selected = {phaseStatus[index]}
                                               title = {phase.title}
                                               active = {index === currentPhase} />)
      }
      <InstallResponse response={response} event={event} />
    </>
  )
}
