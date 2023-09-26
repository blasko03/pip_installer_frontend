import { ACTIONS, type IKeyEvent } from '@/types/i_key_event'
import KeyEventListner from '.'
import { setup } from '../utils/testing_setup'
import { type ReactElement, useEffect } from 'react'

function EventDetectComponentWrapper (props: any): ReactElement {
  return <EventDetectComponent {...props} />
}

const keyEvents = [
  { action: ACTIONS.ENTER, keys: ['Enter'] }
]

const mock = jest.fn()

const EventDetectComponent = ({ event }: { event: IKeyEvent }): ReactElement => {
  useEffect(() => {
    mock(event)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])
  return <div></div>
}

test('test event listner detects event', async () => {
  const { user } = setup(<KeyEventListner keyEvents={keyEvents}><EventDetectComponentWrapper /></KeyEventListner>)
  await user.keyboard('[Enter]')
  expect(mock).toHaveBeenCalledWith({ action: ACTIONS.ENTER })
})
