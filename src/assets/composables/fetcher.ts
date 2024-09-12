import { useHttpStore } from '@stores'

const $http = useHttpStore()
const $endpoint = $http.$endpoint

class Fetcher {
  async get(url: string) {
    const response = await fetch(`${$endpoint}${url}`, {
      headers: $http.authorize_headers(),
      credentials: 'include'
    })
    return response.json()
  }

  async put(url: string, data: any) {
    const response = await fetch(`${$endpoint}${url}`, {
      method: 'PUT',
      headers: $http.authorize_headers(),
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async post(url: string, data: any) {
    const response = await fetch(`${$endpoint}${url}`, {
      method: 'POST',
      headers: $http.authorize_headers(),
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return response.json()
  }

  async delete(url: string) {
    const response = await fetch(`${$endpoint}${url}`, {
      method: 'DELETE',
      headers: $http.authorize_headers(),
      credentials: 'include'
    })
    return response.json()
  }
}

export const fetcher = new Fetcher()
