import { defineStore } from 'pinia'
import { set } from '@/stores/reusable/funcs'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { List } from '@/assets/types'

export const useProjectStore = defineStore(
  'project',
  () => {
    const version: Ref<number> = ref(1)
    const id: Ref<number | undefined> = ref(undefined)
    const title: Ref<string | undefined> = ref(undefined)
    const list: Ref<List[] | undefined> = ref(undefined)

    return { version, id, title, list, set }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['version', 'id', 'title']
      },
      {
        storage: sessionStorage,
        pick: ['list']
      }
    ]
  }
)
