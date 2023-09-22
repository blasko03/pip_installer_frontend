import { type IServer } from '@/types/i_server'
import { type ReactElement } from 'react'
import _servers from '@/config/servers.json'
import { ascendingOrder } from '@/app/utils/ascendingOrder'
import { type IPhaseProps } from '@/types/i_phase_props'
import GenericPhase from '../generic_phase'

export default function SelectServerPhase ({ event, active, nextPhase, setPhasesResults }: IPhaseProps): ReactElement {
  const servers: IServer[] = _servers.sort(function (a: IServer, b: IServer) {
    return ascendingOrder(a.name, b.name)
  })

  function enterAction (selected: number): void {
    setPhasesResults(p => ({ ...p, server: servers[selected].address }))
    nextPhase()
  }

  return <GenericPhase {...{ ...{ values: servers.map(x => x.name) }, event, enterAction, active }} />
}
