import { type ReactElement } from 'react'
import Phases from '@/app/phases'
import KeyEventListner from '@/app/key_event_listner'

function PhasesWrapper (props: any): ReactElement {
  return <Phases {...props} />
}

export default function Home (): ReactElement {
  const keyEvents = [
    { action: 'up', keys: ['ArrowUp', 'a'] },
    { action: 'down', keys: ['ArrowDown', 'c'] },
    { action: 'enter', keys: ['Enter', 'b'] }
  ]

  return <main>
      <KeyEventListner keyEvents={keyEvents}>
        <PhasesWrapper />
      </KeyEventListner>
    </main>
}
