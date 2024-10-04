import { defineStore } from 'pinia'
import { ref } from 'vue'
import { minWidth, maxWidth, cssWidth, width, expand } from './resize'

export const useStore = defineStore('sidebar', () => {
  const components: any = ref({
    top: [],
    bottom: []
  })

  return {
    minWidth,
    maxWidth,
    cssWidth,
    width,
    components,
    expand
  }
})
