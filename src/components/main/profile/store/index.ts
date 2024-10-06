import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { List } from '@types'
import type { User } from '..'
import { $viewer, isViewerActive, currentImageIndex, updateImages, deleteImage } from './images'
import { cropper, crop, clearCropper, setFreshAvatar, updateAvatar } from './cropper'

export const useStore = defineStore('profile', () => {
  const roles: Ref<List> = ref([])
  const user: Ref<User> = ref(undefined)

  return {
    user,
    roles,

    $viewer,
    isViewerActive,
    currentImageIndex,
    updateImages,
    deleteImage,

    cropper,
    crop,
    clearCropper,
    setFreshAvatar,
    updateAvatar
  }
})
