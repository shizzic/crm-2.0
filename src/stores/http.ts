import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { useSettingsStore } from './settings/main'
import { set } from './reusable/funcs'

export const useHttpStore = defineStore('http', () => {
  const domain_name: string | null = null
  const project_id: number | null = null
  const component_id: number | null = null

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

    // targetDomain добавляю только, если это не localhost
    if (window.location.hostname === import.meta.env.VITE_SELF_DOMAIN_NAME)
      headers.targetDomain = !domain_name ? window.location.hostname : domain_name

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
    // targetDomain добавляю только, если это не localhost
    if (window.location.hostname === import.meta.env.VITE_SELF_DOMAIN_NAME)
      headers.targetDomain = !domain_name ? window.location.hostname : domain_name

    return headers
  }

  return { domain_name, set, authorize_headers, non_authorize_headers }
})
