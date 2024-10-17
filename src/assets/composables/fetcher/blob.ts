import { useHttpStore } from '@stores'

export default class Blob {
  async get(url: string): Promise<string> {
    const blob = await fetch(url, {
      cache: 'force-cache',
      headers: useHttpStore().raw_headers() as HeadersInit,
      credentials: 'include'
    }).then((r) => r.blob())
    return URL.createObjectURL(blob)
  }
}
