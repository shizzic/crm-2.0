import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { List } from '@types'
import type { User } from '..'
import { isViewerActive, currentImageIndex, updateImages, deleteImage } from './images'
import { cropper } from './cropper'

export const useStore = defineStore('profile', () => {
  const roles: Ref<List> = ref([])
  const user: Ref<User> = ref(undefined)

  return { user, roles, isViewerActive, currentImageIndex, updateImages, deleteImage, cropper }
})
