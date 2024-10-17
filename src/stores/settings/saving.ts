import { getActivePinia, defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useUserStore } from '@stores'
import { fetcher } from '@composables/fetcher'
import { setTimeout, clearTimeout } from 'worker-timers'

interface UserSettingsResponse {
  avatar: string
  settings: {
    [index: string]: any
  }
}

const filename = 'settingsV2'
const tiktak: Ref<number | null> = ref(null)

export function saveUserSettings(): void {
  if (tiktak.value !== null) {
    clearTimeout(tiktak.value)
    tiktak.value = null
  }

  tiktak.value = setTimeout(uploadSettings, 1700)
}

function uploadSettings(): void {
  if (!useUserStore().isLoggedIn) return
  const request: any = {
    settings: JSON.parse(localStorage.getItem('settings') ?? JSON.stringify({})),
    sidebar: JSON.parse(localStorage.getItem('sidebar') ?? JSON.stringify({}))
  }
  fetcher.put(`user/user/set-user-settings?filename=${filename}`, request)
}

export async function loadUserSettings(): Promise<void> {
  if (!useUserStore().isLoggedIn) return
  const activepinia = getActivePinia()
  if (!activepinia) return

  const r: UserSettingsResponse = await fetcher.get(
    `user/user/get-user-settings?filename=${filename}`
  )

  for (const storeName in r.settings)
    for (const fieldName in r.settings[storeName]) {
      const field: any = r.settings[storeName][fieldName]
      const storeDefinition = defineStore(storeName, activepinia.state.value[storeName])
      const store = storeDefinition(activepinia)

      if (!(fieldName in store.$state)) continue
      store.$state[fieldName as keyof typeof store.$state] = field

      //   store.$reset()
    }

  console.log(r)
}
