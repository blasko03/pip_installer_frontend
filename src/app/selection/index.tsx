import { type ReactElement } from 'react'
import Phases from './phases'
import _servers from '@/config/servers.json'
import _packages from '@/config/packages.json'
import { ascendingOrder } from '@/app/utils/ascendingOrder'
import { type IServer } from '@/types/i_server'
import KeyEventListner from '../key_event_listner'

function PhasesWrapper (props: any): ReactElement {
  return <Phases {...props} />
}

export default function Selection (): ReactElement {
  const servers: IServer[] = _servers.sort(function (a: IServer, b: IServer) {
    return ascendingOrder(a.name, b.name)
  })
  const packages: string[] = _packages.sort(ascendingOrder)

  const keyEvents = [
    { action: 'up', keys: ['ArrowUp', 'a'] },
    { action: 'down', keys: ['ArrowDown', 'c'] },
    { action: 'enter', keys: ['Enter', 'b'] }
  ]

  return <KeyEventListner keyEvents={keyEvents}>
       <PhasesWrapper {...{ servers, packages }} />
    </KeyEventListner>
}
