import { ACTIONS, type IKeyEvent } from '@/types/i_key_event'
import { type Dispatch, type SetStateAction } from 'react'

interface Params {
  event: IKeyEvent
  active: boolean
  setSelected: Dispatch<SetStateAction<number>>
  enterAction: any
  values: string[]
  selected: number
}

export const eventAction = ({ event, active, enterAction, values, setSelected, selected }: Params): void => {
  if (!active) {
    return
  }
  if (event.action === ACTIONS.UP) {
    setSelected(status => Math.max(status - 1, 0))
  }
  if (event.action === ACTIONS.DOWN) {
    setSelected(status => Math.min(status + 1, values.length - 1))
  }
  if (event.action === ACTIONS.ENTER) {
    enterAction(selected)
  }
}
