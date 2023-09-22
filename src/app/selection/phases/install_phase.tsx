import { type IKeyEvent } from '@/types/i_key_event'
import { useState, type ReactElement, useEffect } from 'react'
import Selector from '../selector'
import { type IPhaseProps } from '@/types/i_phase_props'
import { type IResponseData } from '@/pages/api/install'
import { installPackage } from '../install_package'
import InstallResponse from '../install_response'

const YES = 'Yes'
const NO = 'No'

export default function InstallPhase ({ event, active, nextPhase, phasesResults }: IPhaseProps): ReactElement {
  const [status, setStatus] = useState(0)
  const [response, setResponse] = useState<IResponseData | undefined>(undefined)
  const values = [YES, NO]

  const eventAction = (event: IKeyEvent): void => {
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
      if (values[status] === YES && response === undefined) {
        void installPackage(phasesResults.packageName, phasesResults.server, setResponse)
      } else {
        setResponse(undefined)
        nextPhase()
      }
    }
  }

  useEffect(() => {
    eventAction(event)
  }, [event])

  if (response != null) {
    return <InstallResponse response={response} event={event} />
  }
  return <Selector list = {values}
                   selected = {status}
                   title = {'Confirm'}
                   active = {active} />
}
