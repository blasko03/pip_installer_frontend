import { useState, type ReactElement, useEffect } from 'react'
import Selector from '../selector'
import { eventAction } from './utils/event_action'
import { type IKeyEvent } from '@/types/i_key_event'

interface IGenericPhaseProps {
  event: IKeyEvent
  active: boolean
  enterAction: (selected: number) => void
  values: any[]
}

export default function GenericPhase ({ event, active, enterAction, values }: IGenericPhaseProps): ReactElement {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    eventAction({ event, active, enterAction, values, setSelected, selected })
  }, [event])

  return <Selector list = {values}
                   selected = {selected}
                   title = {'Select package'}
                   active = {active} />
}
