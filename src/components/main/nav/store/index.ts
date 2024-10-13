import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Item, Menu } from '..'
import { useComponentsStore, useAccessStore } from '@stores'

export const useNavStore = defineStore(
  'nav',
  () => {
    const width = ref(82)
    const minWidth = 82
    const maxWidth = 200
    const menu: Ref<Menu> = ref([
      {
        icon: '/nav/settings.webp',
        name: 'settings'
      }
    ])

    function changeNavWidth(): void {
      width.value = width.value === minWidth ? maxWidth : minWidth
    }

    function isAccessable(name: string): boolean {
      if (useComponentsStore().list[name]?.id)
        return Number(useComponentsStore().list[name]?.id) in useAccessStore().list

      return true
    }

    function isDeeper(data: Item): boolean {
      if (data.list) for (const item of data.list) if (isDeeper(item)) return true
      return isAccessable(data.name)
    }

    return { width, minWidth, maxWidth, menu, changeNavWidth, isDeeper, isAccessable }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['width']
      }
    ]
  }
)
