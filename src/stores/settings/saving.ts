import { getActivePinia } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useUserStore } from '@stores'
import { fetcher } from '@composables/fetcher'
import { setTimeout, clearTimeout } from 'worker-timers'

const tiktak: Ref<number | null> = ref(null)

export function saveUserSettings(): void {
  if (tiktak.value !== null) {
    clearTimeout(tiktak.value)
    tiktak.value = null
  }

  tiktak.value = setTimeout(uploadSettings, 1700)
}

function uploadSettings(): void {
  // const storeDefinition = defineStore(storeName, activepinia.state.value[storeName])
  // const store = storeDefinition(activepinia)
  // store.$reset()

  console.log(12)
  if (!useUserStore().isLoggedIn) return
  const activepinia = getActivePinia()
  if (!activepinia) return
  const request: any = {
    settings: JSON.parse(localStorage.getItem('settings') ?? JSON.stringify({})),
    sidebar: JSON.parse(localStorage.getItem('sidebar') ?? JSON.stringify({}))
  }
  fetcher.put('user/user/set-user-settings?filename=settingsV2', request)
}
