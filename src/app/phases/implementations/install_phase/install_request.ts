import { type IResponseData } from '@/pages/api/install'

export async function installPackage (packageName: string, server: string, setResponse: (params: IResponseData) => void): Promise<void> {
  setResponse({ return_code: 0, std_out: 'Waiting response' })
  try {
    const response = await callBackend(packageName, server)
    if (response.status >= 300) { throw new Error('Resoinse error!') }
    setResponse(await response.json())
  } catch (error) {
    setResponse({ return_code: 1, std_err: 'Error processing response' })
  }
}

async function callBackend (packageName: string, server: string): Promise<Response> {
  return await fetch('/api/install', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      packageName,
      server
    })
  })
}
