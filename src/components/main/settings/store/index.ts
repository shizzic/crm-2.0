import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('component/settings', () => {
  const search = ref('')

  return { search }
})
