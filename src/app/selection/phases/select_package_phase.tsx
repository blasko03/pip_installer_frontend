import { type IKeyEvent } from '@/types/i_key_event'
import { useState, type ReactElement, useEffect } from 'react'
import _packages from '@/config/packages.json'
import { ascendingOrder } from '@/app/utils/ascendingOrder'
import Selector from '../selector'
import { type IPhaseProps } from '@/types/i_phase_props'

export default function SelectServerPhase ({ event, active, nextPhase, setPhasesResults }: IPhaseProps): ReactElement {
  const packages: string[] = _packages.sort(ascendingOrder)

  const [status, setStatus] = useState(0)

  const eventAction = (event: IKeyEvent): void => {
    if (!active) {
      return
    }
    if (event.action === 'up') {
      setStatus(status => Math.max(status - 1, 0))
    }
    if (event.action === 'down') {
      setStatus(status => Math.min(status + 1, packages.length - 1))
    }
    if (event.action === 'enter') {
      setPhasesResults(p => ({ ...p, packageName: packages[status] }))
      nextPhase()
    }
  }

  useEffect(() => {
    eventAction(event)
  }, [event])

  return <Selector list = {packages}
                   selected = {status}
                   title = {'Select package'}
                   active = {active} />
}
