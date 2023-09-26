import { getByText } from '@testing-library/react'
import Selector from '.'
import { setup } from '../utils/testing_setup'

test('test nth element of selector is active', async () => {
  const { container } = setup(<Selector list = {['1', '2', '3']} selected={2} active={true} title={'test'} />)
  const prova = container.querySelector('div > div > div > div')
  expect(getByText(prova, '3').className).toBe('active')
})
