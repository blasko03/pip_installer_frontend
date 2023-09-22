'use client'
import { type ReactElement, useState } from 'react'
import { type IKeyEvent } from '@/types/i_key_event'
import SelectServerPhase from './implementations/select_server_phase'
import SelectPackagePhase from './implementations/select_package_phase'
import InstallPhase from './implementations/install_phase'

export default function Phases ({ event }: { event: IKeyEvent }): ReactElement {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [phasesResults, setPhasesResults] = useState({})

  function nextPhase (): void {
    setCurrentPhase(p => (p + 1) % phases.length)
  }

  const phases = [SelectServerPhase, SelectPackagePhase, InstallPhase]
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
