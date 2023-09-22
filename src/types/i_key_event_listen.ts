import { type IKeyEvent } from './i_key_event'

export interface IKeyEventListen extends IKeyEvent {
  keys: string[]
}
