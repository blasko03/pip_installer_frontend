import { type IServer } from '@/types/i_server'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface IResponseData {
  return_code: number
  std_out?: string
  std_err?: string
}

interface IRequestData {
  packageName: string
  server: IServer
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
): Promise<void> {
  if (process.env.PIP_SERVER_USERNAME == null || process.env.PIP_SERVER_PASSWORD == null) {
    throw new Error('Env variables not set correctly!')
  }
  const body: IRequestData = req.body
  const response = await fetch(`${body.server.address}/install`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`${process.env.PIP_SERVER_USERNAME}:${process.env.PIP_SERVER_PASSWORD}`),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ package: body.packageName })
  })
  res.status(response.status).json(await response.json())
}
