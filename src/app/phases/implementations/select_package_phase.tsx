import { type ReactElement } from 'react'
import packages from '@/config/packages.json'
import { ascendingOrder } from '@/app/utils/ascendingOrder'
import { type IPhaseProps } from '@/types/i_phase_props'
import GenericPhase from '../generic_phase'

export default function SelectServerPhase ({ event, active, nextPhase, setPhasesResults }: IPhaseProps): ReactElement {
  const values: string[] = packages.sort(ascendingOrder)

  function enterAction (selected: number): void {
    setPhasesResults(p => ({ ...p, packageName: packages[selected] }))
    nextPhase()
  }

  return <GenericPhase {...{ values, event, enterAction, active, title: 'Select package' }} />
}
