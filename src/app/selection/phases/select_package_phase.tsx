import { useState, type ReactElement, useEffect } from 'react'
import packages from '@/config/packages.json'
import { ascendingOrder } from '@/app/utils/ascendingOrder'
import Selector from '../selector'
import { type IPhaseProps } from '@/types/i_phase_props'
import { eventAction } from './utils/eventAction'

export default function SelectServerPhase ({ event, active, nextPhase, setPhasesResults }: IPhaseProps): ReactElement {
  const values: string[] = packages.sort(ascendingOrder)

  const [status, setStatus] = useState(0)

  function enterAction (): void {
    setPhasesResults(p => ({ ...p, packageName: packages[status] }))
    nextPhase()
  }

  useEffect(() => {
    eventAction({ event, active, enterAction, values, setStatus })
  }, [event])

  return <Selector list = {values}
                   selected = {status}
                   title = {'Select package'}
                   active = {active} />
}
