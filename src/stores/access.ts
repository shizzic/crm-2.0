import { defineStore } from 'pinia'
import { set } from '@/stores/reusable/funcs'
import { ref } from 'vue'
import type { Ref } from 'vue'

interface Access {
  [k: number]: number
}

export const useAccessStore = defineStore(
  'access',
  () => {
    const version: Ref<number> = ref(1)
    const list: Ref<Access> = ref({})

    return { version, list, set }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['version']
      },
      {
        storage: sessionStorage,
        pick: ['list']
      }
    ]
  }
)
