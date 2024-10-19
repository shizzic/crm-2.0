import { defineStore } from 'pinia'
import {
  resetAllStores,
  useHttpStore,
  useDeviceStore,
  useProjectStore,
  useAccessStore
} from '@stores'
import { emitter as cancel } from '@/views/lib/cancel'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

declare global {
  interface Window {
    PasswordCredential: any
  }
}

export const useUserStore = defineStore(
  'user',
  () => {
    const $endpoint = useHttpStore().$endpoint
    const id: Ref<number | undefined> = ref(undefined)
    const username: Ref<string | undefined> = ref(undefined)
    const avatar: Ref<string | undefined> = ref(undefined)
    const isLoggedIn = computed(() => Boolean(id.value))

    function login(
      invalid: boolean,
      form: { phone: string; email: string; password: string }
    ): void {
      if (invalid) return

      fetch($endpoint + 'user/user/login', {
        method: 'POST',
        headers: useHttpStore().non_authorize_headers(),
        credentials: 'include',
        body: JSON.stringify({
          phone: form.phone,
          email: form.email,
          password: form.password,
          device: useDeviceStore().current
        })
      })
        .then((data) => {
          return data.json()
        })
        .then((r) => {
          if (!(r?.status === 200 && r?.data)) return logout()
          add_login_credential(form.phone.length > 0 ? form.phone : form.email, form.password)

          // выполняю вход, только если у юзера есть доступ к домену с которого был выполнен вход
          if (r.data.domain_access) {
            username.value = r.data.username
            avatar.value = r.data.avatar
            useDeviceStore().list = r.data.devices

            if (r.data.projects?.length > 0) {
              useProjectStore().list = r.data.projects
              useProjectStore().id = r.data.projects[0].id
              useProjectStore().title = r.data.projects[0].title
            }

            if (r.data.access) {
              useAccessStore().list = r.data.access
              useAccessStore().roles = r.data.roles
            }

            id.value = r.data.id
          } else {
            logout()
          }
        })
    }

    function logout(fromEverywhere?: boolean): void {
      console.trace()
      if (!fromEverywhere) useDeviceStore().untieUserDevice()
      resetAllStores('settings', 'project')
    }

    // save_password prompt in browser
    function add_login_credential(id: string, password: string): void {
      const loginCredential = new window.PasswordCredential({
        id: id,
        password: password
      })

      navigator.credentials.store(loginCredential)
    }

    function request_new_password(invalid: boolean, email: string): void {
      if (invalid) return

      fetch($endpoint + 'user/user/request-reset', {
        method: 'PUT',
        headers: useHttpStore().non_authorize_headers(),
        credentials: 'include',
        body: JSON.stringify({
          email: email
        })
      })

      cancel.emit('default')
    }

    return { id, username, avatar, isLoggedIn, login, logout, request_new_password }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['id', 'username', 'avatar']
    }
  }
)
