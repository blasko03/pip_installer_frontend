import { type IServer } from '@/types/i_server'
import { useState, type ReactElement, useEffect } from 'react'
import _servers from '@/config/servers.json'
import { ascendingOrder } from '@/app/utils/ascendingOrder'
import Selector from '../selector'
import { type IPhaseProps } from '@/types/i_phase_props'
import { eventAction } from './utils/eventAction'

export default function SelectServerPhase ({ event, active, nextPhase, setPhasesResults }: IPhaseProps): ReactElement {
  const values: IServer[] = _servers.sort(function (a: IServer, b: IServer) {
    return ascendingOrder(a.name, b.name)
  })

  const [status, setStatus] = useState(0)

  function enterAction (): void {
    setPhasesResults(p => ({ ...p, server: values[status].address }))
    nextPhase()
  }

  useEffect(() => {
    eventAction({ event, active, enterAction, ...{ values: values.map(x => x.address) }, setStatus })
  }, [event])

  return <Selector list = {values.map(x => x.name)}
                   selected = {status}
                   title = {'Select server'}
                   active = {active} />
}
