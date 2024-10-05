import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import router from '@/router'
import { minWidth, maxWidth, cssWidth, width, expand } from './resize'
import type { Components } from '..'

export const useStore = defineStore('sidebar', () => {
  const components: Ref<Components> = ref({
    top: [],
    bottom: []
  })

  // очищаю все sub-components каждый router navigation hook
  router.beforeEach(() => {
    components.value.top = []
    components.value.bottom = []
    return true
  })

  // получаю index массива top или bottom нужного компонента, чтобы была возможность его мутировать
  function getComponentIdentifier(__hmrId: string): number {
    for (const identifier in components.value.top)
      if (components.value.top[identifier].component.__asyncResolved.__hmrId === __hmrId)
        return +identifier
    for (const identifier in components.value.bottom)
      if (components.value.top[identifier].component.__asyncResolved.__hmrId === __hmrId)
        return +identifier

    return -1
  }

  return {
    minWidth,
    maxWidth,
    cssWidth,
    width,
    expand,

    components,
    getComponentIdentifier
  }
})
