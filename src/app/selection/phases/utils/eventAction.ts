import { type IKeyEvent } from '@/types/i_key_event'
import { type Dispatch, type SetStateAction } from 'react'

interface Params {
  event: IKeyEvent
  active: boolean
  setStatus: Dispatch<SetStateAction<number>>
  enterAction: any
  values: string[]
}

export const eventAction = ({ event, active, enterAction, values, setStatus }: Params): void => {
  if (!active) {
    return
  }
  if (event.action === 'up') {
    setStatus(status => Math.max(status - 1, 0))
  }
  if (event.action === 'down') {
    setStatus(status => Math.min(status + 1, values.length - 1))
  }
  if (event.action === 'enter') {
    enterAction()
  }
}
