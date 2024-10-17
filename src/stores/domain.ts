import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { List } from '@types'

export const useDomainStore = defineStore(
  'domain',
  () => {
    const id: Ref<number | undefined> = ref(undefined)
    const title: Ref<string | undefined> = ref(undefined)
    const list: Ref<List> = ref(undefined)

    return { id, title, list }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['id', 'title']
      },
      {
        storage: sessionStorage,
        pick: ['list']
      }
    ]
  }
)
