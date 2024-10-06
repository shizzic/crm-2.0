import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
interface Recached {
  [k: string]: boolean
}

export const useImageStore = defineStore('image', () => {
  const recache: Ref<Recached> = ref({})

  return { recache }
})
