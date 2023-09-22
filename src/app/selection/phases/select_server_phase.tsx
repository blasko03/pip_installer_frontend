import { type IKeyEvent } from '@/types/i_key_event'
import { type IServer } from '@/types/i_server'
import { useState, type ReactElement, useEffect } from 'react'
import _servers from '@/config/servers.json'
import { ascendingOrder } from '@/app/utils/ascendingOrder'
import Selector from '../selector'
import { type IPhaseProps } from '@/types/i_phase_props'

export default function SelectServerPhase ({ event, active, nextPhase, setPhasesResults }: IPhaseProps): ReactElement {
  const servers: IServer[] = _servers.sort(function (a: IServer, b: IServer) {
    return ascendingOrder(a.name, b.name)
  })

  const [status, setStatus] = useState(0)

  const eventAction = (event: IKeyEvent): void => {
    if (!active) {
      return
    }
    if (event.action === 'up') {
      setStatus(status => Math.max(status - 1, 0))
    }
    if (event.action === 'down') {
      setStatus(status => Math.min(status + 1, servers.length - 1))
    }
    if (event.action === 'enter') {
      setPhasesResults(p => ({ ...p, server: servers[status].address }))
      nextPhase()
    }
  }

  useEffect(() => {
    eventAction(event)
  }, [event])

  return <Selector list = {servers.map(x => x.name)}
                   selected = {status}
                   title = {'Select server'}
                   active = {active} />
}
