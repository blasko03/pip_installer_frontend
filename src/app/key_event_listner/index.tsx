'use client'
import { useEffect, type ReactElement, useState, cloneElement } from 'react'
import { type IKeyEventListen } from '@/types/i_key_event_listen'
import { type IKeyEvent } from '@/types/i_key_event'

export default function KeyEventListner ({ children, keyEvents }: { keyEvents: IKeyEventListen[], children: React.ReactElement }): ReactElement {
  const [event, setEvent] = useState<IKeyEvent>({ action: 'none' })

  function handleKeyDown (this: Document, ev: KeyboardEvent): void {
    const event = keyEvents.filter(e => e.keys.includes(ev.key))[0]
    if (event != null) { setEvent({ action: event.action }) }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return function cleanup () {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <>{cloneElement(children, { ...children.props, event })}</>
}
