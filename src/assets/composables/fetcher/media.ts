import { useHttpStore } from '@stores'

const $http = useHttpStore()
const $endpoint = $http.$endpoint

export default class Media {
  async put(url: string, data: FormData): Promise<any> {
    const response = await fetch(`${$endpoint}${url}`, {
      method: 'PUT',
      cache: 'reload',
      headers: $http.media_headers() as HeadersInit,
      credentials: 'include',
      body: data
    })
    return response.json()
  }

  async post(url: string, data: FormData): Promise<any> {
    const response = await fetch(`${$endpoint}${url}`, {
      method: 'POST',
      cache: 'reload',
      headers: $http.media_headers() as HeadersInit,
      credentials: 'include',
      body: data
    })
    return response.json()
  }
}
