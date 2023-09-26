import { type IServer } from '@/types/i_server'
import Home from './page'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type ReactElement } from 'react'

function moduleList (): string[] {
  return ['module1', 'module2']
}
function serverList (): IServer[] {
  return [
    { name: 'server1', address: 'http://server1:6453' },
    { name: 'server2', address: 'http://server2:6453' }
  ]
}

jest.mock('../config/packages.json', () => moduleList(), { virtual: true })
jest.mock('../config/servers.json', () => serverList(), { virtual: true })

function setup (jsx: ReactElement): any {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  }
}

const fetch = jest.fn(async () =>
  await Promise.resolve({
    json: async () => { },
    status: 200,
    headers: {
      get: (_key: string) => 'application/zip'
    }
  })
) as jest.Mock

test('test interface to send request', async () => {
  global.fetch = fetch
  const { user } = setup(<Home />)
  await user.keyboard('[ArrowUp]')
  await user.keyboard('[Enter]')
  await user.keyboard('[ArrowDown]')
  await user.keyboard('[Enter]')
  await user.keyboard('[Enter]')

  const request: { packageName: string, server: string } = JSON.parse(fetch.mock.lastCall[1].body)
  expect(request.packageName).toBe(moduleList()[1])
  expect(request.server).toBe(serverList()[0].address)
})
