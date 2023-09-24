import { useState, type ReactElement } from 'react'
import { type IPhaseProps } from '@/types/i_phase_props'
import { type IResponseData } from '@/pages/api/install'
import InstallResponse from './install_phase/install_response'
import GenericPhase from '../generic_phase'
import { installPackage } from './install_phase/install_request'

enum Actions {
  YES = 'Yes',
  NO = 'No'
}

export default function InstallPhase ({ event, active, nextPhase, phasesResults }: IPhaseProps): ReactElement {
  const [response, setResponse] = useState<IResponseData | undefined>(undefined)

  const values: string[] = Object.values(Actions)
  function enterAction (selected: number): void {
    if (values[selected] === Actions.YES && response === undefined) {
      void installPackage(phasesResults.packageName, phasesResults.server, setResponse)
    } else {
      setResponse(undefined)
      nextPhase()
    }
  }

  return <>
    <GenericPhase {...{ values, event, enterAction, active, title: 'Confirm' }} />
    <InstallResponse response={response} event={event} />
  </>
}
