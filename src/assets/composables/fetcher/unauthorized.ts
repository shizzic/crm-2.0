import { useHttpStore } from '@stores'
import { returnResponseData } from '.'

export default class Unauthorized {
  async get(url: string): Promise<any> {
    const r = await fetch(`${useHttpStore().$endpoint}${url}`, {
      headers: useHttpStore().non_authorize_headers() as HeadersInit,
      credentials: 'include'
    })
    return returnResponseData(r)
  }

  async put(url: string, data?: FormData): Promise<any> {
    const r = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'PUT',
      headers: useHttpStore().non_authorize_headers() as HeadersInit,
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined
    })
    return returnResponseData(r)
  }

  async post(url: string, data?: FormData): Promise<any> {
    const r = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'POST',
      headers: useHttpStore().non_authorize_headers() as HeadersInit,
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined
    })
    return returnResponseData(r)
  }
}
