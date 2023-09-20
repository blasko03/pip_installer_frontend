import { IResponseData } from "@/pages/api/install";
import { IServer } from "@/types/i_server";

export async function installModel(modelName: string, server: IServer, setResponse: Function) {
    setResponse({return_code: 0, std_out: 'Waiting response'})
    try {
        const response = await callBackend(modelName, server)
        if(response.status >= 300)
          throw new Error('Resoinse error!');
        setResponse(await response.json())
      } catch (error) {
        setResponse({return_code: 1, std_err: 'Error processing response'})
    }
}

async function callBackend(modelName: string, server: IServer) {
    return await fetch('/api/install', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({modelName: modelName,
          server: server})
      });
}