import { defineStore } from 'pinia'
import { set } from '@stores/reusable/funcs'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { List } from '@types'

interface Access {
  [k: number]: number
}

export const useAccessStore = defineStore(
  'access',
  () => {
    const version: Ref<number> = ref(1)
    const list: Ref<Access> = ref({})
    const roles: Ref<List> = ref([])

    return { version, list, roles, set }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['version', 'roles']
      },
      {
        storage: sessionStorage,
        pick: ['list']
      }
    ]
  }
)
