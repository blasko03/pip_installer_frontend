import { type Dispatch, type SetStateAction } from 'react'
import { type IKeyEvent } from './i_key_event'

export interface IPhaseProps {
  event: IKeyEvent
  active: boolean
  nextPhase: () => void
  phasesResults: Record<string, string>
  setPhasesResults: Dispatch<SetStateAction<Record<string, string>>>
}
