import { defineStore } from 'pinia'
import { set } from '@/stores/reusable/funcs'
import { useHttpStore } from '@/stores'
import { inject } from 'vue'

declare global {
  interface Window {
    PasswordCredential: any
  }
}

export const useUserStore = defineStore('user', () => {
  const $endpoint = inject('$endpoint')
  const id: number | null = null

  function login(invalid: boolean, form: { phone: string; email: string; password: string }): void {
    if (invalid) return

    fetch($endpoint + 'user/user/login', {
      method: 'POST',
      headers: useHttpStore().non_authorize_headers(),
      credentials: 'include',
      body: JSON.stringify({
        phone: form.phone,
        email: form.email,
        password: form.password
        // device: this.$store.getters.DEVICES({ key: "device" })
      })
    })
      .then((data) => {
        return data.json()
      })
      .then((r) => {
        if (!(r?.status === 200 && r?.data)) return
        add_login_credential(form.phone.length > 0 ? form.phone : form.email, form.password)

        // if (data.status !== 404 && data.data && data.data.domain_access) {
        //     this.$store.commit("SET_USERNAME", data.data.username)
        //     this.$store.commit("SET_AVATAR", data.data.avatar)
        //     this.$store.commit("DEVICES", { key: "devices", value: data.data.devices })

        //     if (data.data.projects && data.data.projects.length > 0) {
        //         this.$store.commit("SET_PROJECT_ID", data.data.projects[0].id)
        //         this.$store.commit("SET_PROJECT_TITLE", data.data.projects[0].title)
        //     }

        //     if (data.data.access)
        //         this.$store.commit("SET_ACCESS", data.data.access)

        //     this.$store.commit("SET_ID", data.data.id)
        // } else
        //     this.$store.commit("LOGOUT")

        // this.http(data)
      })
  }

  // save_password prompt in browser
  function add_login_credential(id: string, password: string): void {
    const loginCredential = new window.PasswordCredential({
      id: id,
      password: password
    })

    navigator.credentials.store(loginCredential)
  }

  return { id, set, login }
})
