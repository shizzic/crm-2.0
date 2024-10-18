import { useHttpStore } from '@stores'
import { returnResponseData } from '.'

export default class Blob {
  async get(url: string): Promise<string> {
    const r = await fetch(url, {
      cache: 'force-cache',
      headers: useHttpStore().raw_headers() as HeadersInit,
      credentials: 'include'
    })
    const blob = await returnResponseData(r, 'blob')
    return URL.createObjectURL(blob)
  }
}
