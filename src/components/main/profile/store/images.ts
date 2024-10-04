import { ref } from 'vue'
import { useStore } from '.'
import { fetcher } from '@composables/fetcher'
import { useUserStore } from '@stores'

export interface ImagesResponse {
  avatar: string
  images: string[]
}

export const isViewerActive = ref(false)
export const currentImageIndex = ref(0)

// Обновляю аватар и фотки в сторе после манипулиции с ономи
export function updateImages(r: ImagesResponse): void {
  const $user = useStore().user
  if (!$user) return
  $user.avatar = r.avatar
  $user.images = r.images

  if ($user.images.length === 0) {
    useUserStore().avatar = '/no-photo.webp'
    $user.avatar = '/no-photo.webp'
  }
}

export function deleteImage(): void {
  const $user = useStore().user
  if (!$user) return

  const index = $user.images[currentImageIndex.value].split('/').splice(-2)[0]
  fetcher.delete(`user/user/delete-img?index=${index}`)
  $user.images.splice(currentImageIndex.value, 1)
}
