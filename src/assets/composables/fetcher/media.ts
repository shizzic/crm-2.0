import { useHttpStore } from '@stores'
import { returnResponseData } from '.'

export default class Media {
  async put(url: string, data: FormData): Promise<any> {
    const r = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'PUT',
      cache: 'reload',
      headers: useHttpStore().media_headers() as HeadersInit,
      credentials: 'include',
      body: data
    })
    return returnResponseData(r)
  }

  async post(url: string, data: FormData): Promise<any> {
    const r = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'POST',
      cache: 'reload',
      headers: useHttpStore().media_headers() as HeadersInit,
      credentials: 'include',
      body: data
    })
    return returnResponseData(r)
  }
}
