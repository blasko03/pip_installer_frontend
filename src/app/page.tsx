'use client'
import { type ReactElement } from 'react'
import Phases from '@/app/phases'
import KeyEventListner from '@/app/key_event_listner'
import { ACTIONS } from '@/types/i_key_event'
import SelectServerPhase from '@/app/phases/implementations/select_server_phase'
import SelectPackagePhase from '@/app/phases/implementations/select_package_phase'
import InstallPhase from '@/app/phases/implementations/install_phase'

function PhasesWrapper (props: any): ReactElement {
  return <Phases {...props} phases={[SelectServerPhase, SelectPackagePhase, InstallPhase]} />
}

export default function Home (): ReactElement {
  const keyEvents = [
    { action: ACTIONS.UP, keys: ['ArrowUp', 'a'] },
    { action: ACTIONS.DOWN, keys: ['ArrowDown', 'c'] },
    { action: ACTIONS.ENTER, keys: ['Enter', 'b'] }
  ]

  return <main>
      <KeyEventListner keyEvents={keyEvents}>
        <PhasesWrapper />
      </KeyEventListner>
    </main>
}
