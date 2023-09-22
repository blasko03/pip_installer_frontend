import { type ReactElement } from 'react'
import Phases from '@/app/phases'
import KeyEventListner from '@/app/key_event_listner'
import { ACTIONS } from '@/types/i_key_event'

function PhasesWrapper (props: any): ReactElement {
  return <Phases {...props} />
}

export default function Home (): ReactElement {
  const keyEvents = [
    { action: ACTIONS.UP, keys: ['ArrowUp', 'a'] },
    { action: ACTIONS.DOWN, keys: ['ArrowDown', 'c'] },
    { action: ACTIONS.ENTER, keys: ['Enter', 'b'] }
  ]

  return <main>
      <KeyEventListner keyEvents={keyEvents}>
        <PhasesWrapper />
      </KeyEventListner>
    </main>
}
