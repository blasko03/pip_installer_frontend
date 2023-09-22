import { type ReactElement } from 'react'
import Phases from './phases'
import KeyEventListner from '../key_event_listner'

function PhasesWrapper (props: any): ReactElement {
  return <Phases {...props} />
}

export default function Selection (): ReactElement {
  const keyEvents = [
    { action: 'up', keys: ['ArrowUp', 'a'] },
    { action: 'down', keys: ['ArrowDown', 'c'] },
    { action: 'enter', keys: ['Enter', 'b'] }
  ]

  return <KeyEventListner keyEvents={keyEvents}>
       <PhasesWrapper />
    </KeyEventListner>
}
