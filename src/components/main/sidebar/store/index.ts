import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import router from '@router'
import { minWidth, maxWidth, cssWidth, width, expand } from './resize'
import type { Components, SubComponent } from '..'

export const useSidebarStore = defineStore(
  'sidebar',
  () => {
    const version = ref(1)
    const components: Ref<Components> = ref({
      top: [],
      bottom: [],

      add: (data: SubComponent, place: 'top' | 'bottom'): boolean => {
        if (getIdentifier(data.component.__hmrId) === -1) {
          components.value[place].push(data)
          return true
        }

        return false
      },
      getIdentifier
    })

    // получаю index массива top или bottom нужного компонента, чтобы была возможность его мутировать
    function getIdentifier(__hmrId: string): number {
      let component: any

      for (const identifier in components.value.top) {
        component = components.value.top[identifier].component
        if (
          ('name' in component ? component.__asyncResolved?.__hmrId : component.__hmrId) === __hmrId
        )
          return +identifier
      }
      for (const identifier in components.value.bottom) {
        component = components.value.bottom[identifier].component
        if (
          ('name' in component ? component.__asyncResolved?.__hmrId : component.__hmrId) === __hmrId
        )
          return +identifier
      }

      return -1
    }

    // очищаю все sub-components каждый router navigation hook
    router.beforeEach(() => {
      components.value.top = []
      components.value.bottom = []
      return true
    })

    return {
      version,

      minWidth,
      maxWidth,
      cssWidth,
      width,
      expand,

      components
    }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['version', 'cssWidth']
      }
    ]
  }
)
