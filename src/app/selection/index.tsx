'use client'
import { useEffect, type ReactElement, useState } from 'react'
import Phases from './phases'
export default function Selection (): ReactElement {
  const [event, setEvent] = useState<any>({ })

  useEffect(() => {
    function handleKeyDown (this: Document, ev: KeyboardEvent): void {
      if (['ArrowUp', 'a'].includes(ev.key)) {
        setEvent({ action: 'up' })
      }
      if (['ArrowDown', 'c'].includes(ev.key)) {
        setEvent({ action: 'down' })
      }
      if (['Enter', 'b'].includes(ev.key)) {
        setEvent({ action: 'enter' })
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return function cleanup () {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return <Phases event = {event} />
}
