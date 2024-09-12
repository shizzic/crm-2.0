import { defineStore } from 'pinia'
import { useUserStore, useSettingsStore } from '@stores'
import { set } from '@stores/reusable/funcs'

export const useHttpStore = defineStore('http', () => {
  const $endpoint: string = import.meta.env.VITE_API_ENDPOINT
  const domain_name: string | undefined = undefined
  const project_id: number | undefined = undefined
  const component_id: number | undefined = undefined

  // С триггером авторизации
  function authorize_headers(): HeadersInit {
    const host: string = window.location.hostname.trim().split('.')[0]
    const viktoriaSecret: string = host === 'test-client' ? 'localhost' : host

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer some',
      project: String(project_id),
      component: String(component_id),
      user: String(useUserStore().id),
      uri: location.pathname,
      viktoriaSecret: viktoriaSecret,
      lang: useSettingsStore().locale
    }

    add_target_domain_if_needed(headers)
    return headers
  }

  // Без триггера авторизации
  function non_authorize_headers(): HeadersInit {
    const host: string = window.location.hostname.trim().split('.')[0]
    const viktoriaSecret: string = host === 'test-client' ? 'localhost' : host

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      uri: location.pathname,
      viktoriaSecret: viktoriaSecret === 'test-client' ? 'localhost' : viktoriaSecret,
      lang: useSettingsStore().locale
    }

    add_target_domain_if_needed(headers)
    return headers
  }

  // header для файлов
  function raw_headers(): HeadersInit {
    const headers: any = authorize_headers()
    headers['Content-Type'] = 'raw'
    headers['Cache-Control'] = 'private'
    return headers
  }

  // targetDomain добавляю только, если это не localhost
  function add_target_domain_if_needed(headers: any): void {
    if (window.location.hostname === $endpoint)
      headers.targetDomain = !domain_name ? window.location.hostname : domain_name
  }

  return { domain_name, $endpoint, set, authorize_headers, non_authorize_headers, raw_headers }
})
