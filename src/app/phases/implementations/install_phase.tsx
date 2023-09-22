import { useState, type ReactElement } from 'react'
import { type IPhaseProps } from '@/types/i_phase_props'
import { type IResponseData } from '@/pages/api/install'
import InstallResponse from './install_phase/install_response'
import GenericPhase from '../generic_phase'
import { installPackage } from './install_phase/install_request'

const YES = 'Yes'
const NO = 'No'

export default function InstallPhase ({ event, active, nextPhase, phasesResults }: IPhaseProps): ReactElement {
  const [response, setResponse] = useState<IResponseData | undefined>(undefined)
  const values = [YES, NO]

  function enterAction (selected: number): void {
    if (values[selected] === YES && response === undefined) {
      void installPackage(phasesResults.packageName, phasesResults.server, setResponse)
    } else {
      setResponse(undefined)
      nextPhase()
    }
  }

  return <>
    <GenericPhase {...{ values, event, enterAction, active }} />
    <InstallResponse response={response} event={event} />
  </>
}