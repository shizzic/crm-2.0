import { useHttpStore } from '@stores'
import Media from './media'

const $http = useHttpStore()
const $endpoint = $http.$endpoint

class Fetcher {
  media: any

  constructor() {
    this.media = new Media()
  }

  async get(url: string): Promise<any> {
    const response = await fetch(`${$endpoint}${url}`, {
      headers: $http.authorize_headers() as HeadersInit,
      credentials: 'include'
    })
    return response.json()
  }

  async put(url: string, data: any): Promise<any> {
    const response = await fetch(`${$endpoint}${url}`, {
      method: 'PUT',
      headers: $http.authorize_headers() as HeadersInit,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async post(url: string, data: any): Promise<any> {
    const response = await fetch(`${$endpoint}${url}`, {
      method: 'POST',
      headers: $http.authorize_headers() as HeadersInit,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async delete(url: string): Promise<any> {
    const response = await fetch(`${$endpoint}${url}`, {
      method: 'DELETE',
      headers: $http.authorize_headers() as HeadersInit,
      credentials: 'include'
    })
    return response.json()
  }
}

export const fetcher = new Fetcher()
