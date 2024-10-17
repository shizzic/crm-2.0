import { useHttpStore } from '@stores'
import Media from './media'
import Blob from './blob'

class Fetcher {
  media: any
  blob: any

  constructor() {
    this.media = new Media()
    this.blob = new Blob()
  }

  async get(url: string): Promise<any> {
    const response = await fetch(`${useHttpStore().$endpoint}${url}`, {
      headers: useHttpStore().authorize_headers() as HeadersInit,
      credentials: 'include'
    })
    return response.json()
  }

  async put(url: string, data: any): Promise<any> {
    const response = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'PUT',
      headers: useHttpStore().authorize_headers() as HeadersInit,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async post(url: string, data: any): Promise<any> {
    const response = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'POST',
      headers: useHttpStore().authorize_headers() as HeadersInit,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async delete(url: string): Promise<any> {
    const response = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'DELETE',
      headers: useHttpStore().authorize_headers() as HeadersInit,
      credentials: 'include'
    })
    return response.json()
  }
}

export const fetcher = new Fetcher()
