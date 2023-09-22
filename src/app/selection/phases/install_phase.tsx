import { useState, type ReactElement, useEffect } from 'react'
import Selector from '../selector'
import { type IPhaseProps } from '@/types/i_phase_props'
import { type IResponseData } from '@/pages/api/install'
import { installPackage } from '../install_package'
import InstallResponse from '../install_response'
import { eventAction } from './utils/eventAction'

const YES = 'Yes'
const NO = 'No'

export default function InstallPhase ({ event, active, nextPhase, phasesResults }: IPhaseProps): ReactElement {
  const [status, setStatus] = useState(0)
  const [response, setResponse] = useState<IResponseData | undefined>(undefined)
  const values = [YES, NO]

  function enterAction (): void {
    if (values[status] === YES && response === undefined) {
      void installPackage(phasesResults.packageName, phasesResults.server, setResponse)
    } else {
      setResponse(undefined)
      nextPhase()
    }
  }

  useEffect(() => {
    eventAction({ event, active, enterAction, values, setStatus })
  }, [event])

  if (response != null) {
    return <InstallResponse response={response} event={event} />
  }
  return <Selector list = {values}
                   selected = {status}
                   title = {'Confirm'}
                   active = {active} />
}
