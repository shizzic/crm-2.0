import { defineStore } from 'pinia'
import { useUserStore, useSettingsStore, useProjectStore, useComponentsStore } from '@stores'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useHttpStore = defineStore('http', () => {
  const $route = useRoute()

  const $endpoint: string = import.meta.env.VITE_API_ENDPOINT
  const domain_name: string | undefined = undefined
  const project = computed(() => useProjectStore().id)
  const component = computed(() =>
    $route?.name ? useComponentsStore().list[String($route.name)]?.id : undefined
  )

  // С триггером авторизации
  function authorize_headers(): Headers {
    const host: string = window.location.hostname.trim().split('.')[0]
    const viktoriaSecret: string = host === 'test-client' ? 'localhost' : host

    const headers: HeadersInit = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Authorization', 'Bearer some')
    if (project.value) headers.set('project', String(project.value))
    if (component.value) headers.set('component', String(component.value))
    headers.set('user', String(useUserStore().id))
    headers.set('uri', location.pathname)
    headers.set('viktoriaSecret', viktoriaSecret)
    headers.set('lang', useSettingsStore().locale)

    add_target_domain_if_needed(headers)
    return headers
  }

  // Без триггера авторизации
  function non_authorize_headers(): Headers {
    const host: string = window.location.hostname.trim().split('.')[0]
    const viktoriaSecret: string = host === 'test-client' ? 'localhost' : host

    const headers: HeadersInit = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('uri', location.pathname)
    headers.set('viktoriaSecret', viktoriaSecret === 'test-client' ? 'localhost' : viktoriaSecret)
    headers.set('lang', useSettingsStore().locale)

    add_target_domain_if_needed(headers)
    return headers
  }

  // header для файлов (обычно с raw получаю blob)
  function raw_headers(): Headers {
    const headers = authorize_headers()
    headers.set('Content-Type', 'raw')
    headers.set('Cache-Control', 'private') // Indicates that all or part of the response message is intended for a single user and MUST NOT be cached by a shared cache, such as a proxy server.
    return headers
  }

  // header для файлов
  function media_headers(): Headers {
    const headers = authorize_headers()
    headers.delete('Content-Type')
    headers.set('Cache-Control', 'private') // Indicates that all or part of the response message is intended for a single user and MUST NOT be cached by a shared cache, such as a proxy server.
    return headers
  }

  // targetDomain добавляю только, если это не localhost
  function add_target_domain_if_needed(headers: Headers): void {
    if (window.location.hostname === $endpoint)
      headers.set('targetDomain', domain_name ?? window.location.hostname)
  }

  return {
    domain_name,
    $endpoint,
    authorize_headers,
    non_authorize_headers,
    raw_headers,
    media_headers
  }
})
