import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Menu } from '..'

export const useNavStore = defineStore(
  'nav',
  () => {
    const width = ref(82)
    const minWidth = 82
    const maxWidth = 200
    const menu: Ref<Menu> = ref([
      {
        icon: '/nav/settings.webp',
        name: 'settings',
        list: [
          {
            name: 'settings',
            alias: 'system',
            list: [
              {
                name: 'settings',
                alias: 'system'
              }
            ]
          },
          {
            name: 'profile',
            list: [{ name: 'profile' }]
          }
        ]
      }
    ])

    function changeNavWidth(): void {
      width.value = width.value === minWidth ? maxWidth : minWidth
    }

    return { width, minWidth, maxWidth, menu, changeNavWidth }
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
