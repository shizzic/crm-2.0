import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Menu } from '..'

export const useNavStore = defineStore('nav', () => {
  const width = ref(82)
  const menu: Ref<Menu> = ref([
    {
      icon: '/nav/settings.webp',
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
        }
      ],
      name: 'settings'
    }
  ])

  return { width, menu }
})
