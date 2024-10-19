import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as Bowser from 'bowser'
import { fetcher } from '@composables/fetcher'
import { useUserStore } from '@stores'
const bowser: any = Bowser

export const useDeviceStore = defineStore(
  'device',
  () => {
    const current: Ref<string> = ref(
      bowser.default.getParser(window.navigator.userAgent).getBrowserName()
    )
    const list: Ref<string[]> = ref([])

    // убрать "активное" устройство из списка доступных для юзера
    function untieUserDevice(): void {
      fetcher.put('user/user/remove-user-device', { device: current.value })
    }

    // убрать все "активные" устройства из списка доступных для юзера
    function untieAllUserDevices(): void {
      fetcher.get('user/user/logout')
      useUserStore().logout(true)
    }

    return { current, list, untieUserDevice, untieAllUserDevices }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['current']
      },
      {
        storage: sessionStorage,
        pick: ['list']
      }
    ]
  }
)
