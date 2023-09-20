import { IServer } from '@/types/i_server'
import type { NextApiRequest, NextApiResponse } from 'next'
 
export type IResponseData = {
  return_code: number,
  std_out: string,
  std_err: string
}

type IRequestData = {
  modelName: string,
  server: IServer
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseData>
) {
  const body: IRequestData = req.body
  const response = await fetch(`${body.server.address}/install`, {
    method: "POST",
    headers: {
      'Authorization': 'Basic ' + btoa('prova:prova'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({package: body.modelName})
  });
  res.status(response.status).json(await response.json())
}
