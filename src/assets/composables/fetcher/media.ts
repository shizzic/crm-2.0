import { useHttpStore } from '@stores'

export default class Media {
  async put(url: string, data: FormData): Promise<any> {
    const response = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'PUT',
      cache: 'reload',
      headers: useHttpStore().media_headers() as HeadersInit,
      credentials: 'include',
      body: data
    })
    return response.json()
  }

  async post(url: string, data: FormData): Promise<any> {
    const response = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'POST',
      cache: 'reload',
      headers: useHttpStore().media_headers() as HeadersInit,
      credentials: 'include',
      body: data
    })
    return response.json()
  }
}
