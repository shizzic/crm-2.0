import { useHttpStore, useUserStore } from '@stores'
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
    const r = await fetch(`${useHttpStore().$endpoint}${url}`, {
      headers: useHttpStore().authorize_headers() as HeadersInit,
      credentials: 'include'
    })
    return returnResponseData(r)
  }

  async put(url: string, data: any): Promise<any> {
    const r = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'PUT',
      headers: useHttpStore().authorize_headers() as HeadersInit,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return returnResponseData(r)
  }

  async post(url: string, data: any): Promise<any> {
    const r = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'POST',
      headers: useHttpStore().authorize_headers() as HeadersInit,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    return returnResponseData(r)
  }

  async delete(url: string): Promise<any> {
    const r = await fetch(`${useHttpStore().$endpoint}${url}`, {
      method: 'DELETE',
      headers: useHttpStore().authorize_headers() as HeadersInit,
      credentials: 'include'
    })
    return returnResponseData(r)
  }
}

function logoutIfCredentialsOutdated(r: Response): boolean {
  if (r.status === 426) {
    useUserStore().logout()
    return true
  }

  return false
}

// общий вывод ответа с автоматизацией
export async function returnResponseData(r: Response, method?: keyof Response): Promise<any> {
  if (useUserStore().isLoggedIn && !logoutIfCredentialsOutdated(r)) {
    // если не передано название нужного метода, тогда по дефолту возвращаю json()
    if (method && method in r && typeof r[method] === 'function') return r[method]()
    else return r.json()
  }
}

export const fetcher = new Fetcher()
