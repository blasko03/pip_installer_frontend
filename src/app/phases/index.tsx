'use client'
import { type ReactElement, useState } from 'react'
import { type IKeyEvent } from '@/types/i_key_event'
import { type IPhaseProps } from '@/types/i_phase_props'

type IPhase = ({ event, active, nextPhase, setPhasesResults }: IPhaseProps) => ReactElement

export default function Phases ({ event, phases }: { event: IKeyEvent, phases: IPhase[] }): ReactElement {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [phasesResults, setPhasesResults] = useState({})

  function nextPhase (): void {
    setCurrentPhase(p => (p + 1) % phases.length)
  }

  return (
    <>
      {
        phases.map((Phase, index) => <Phase key={Phase.toString()}
                                            event = {event}
                                            nextPhase={nextPhase}
                                            phasesResults = {phasesResults}
                                            setPhasesResults = {setPhasesResults}
                                            active = {index === currentPhase} />)
      }
    </>
  )
}
