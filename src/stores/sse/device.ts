import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as Bowser from 'bowser'
const bowser: any = Bowser

export const useDeviceStore = defineStore(
  'device',
  () => {
    const current: Ref<string> = ref(
      bowser.default.getParser(window.navigator.userAgent).getBrowserName()
    )
    const list: Ref<string[]> = ref([])

    return { current, list }
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
