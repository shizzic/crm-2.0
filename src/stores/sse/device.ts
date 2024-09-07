import { defineStore } from 'pinia'
import { set } from '@/stores/reusable/funcs'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as Bowser from 'bowser'

export const useDeviceStore = defineStore(
  'device',
  () => {
    const version: Ref<number, number> = ref(1)
    const current = Bowser.getParser(window.navigator.userAgent).getBrowserName()
    const list = ref([])

    return { version, current, list, set }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['version', 'current', 'list']
    }
  }
)
