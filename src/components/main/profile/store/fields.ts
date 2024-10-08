import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFieldsStore = defineStore(
  'profile/fields',
  () => {
    const expand = ref(false)

    return { expand }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['expand']
      }
    ]
  }
)
