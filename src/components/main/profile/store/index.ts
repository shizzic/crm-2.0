import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { List } from '@types'
import type { User } from '..'

export const useStore = defineStore('profile', () => {
  const roles: Ref<List> = ref([])
  const user: Ref<User> = ref(undefined)

  return { user, roles }
})
