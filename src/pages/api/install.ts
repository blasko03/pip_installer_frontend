import { type IServer } from '@/types/i_server'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface IResponseData {
  return_code: number
  std_out?: string
  std_err?: string
}

interface IRequestData {
  modelName: string
  server: IServer
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
): Promise<void> {
  const body: IRequestData = req.body
  const response = await fetch(`${body.server.address}/install`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa('#{process.env.pip_server_username}:#{process.env.pip_server_password}'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ package: body.modelName })
  })
  res.status(response.status).json(await response.json())
}
