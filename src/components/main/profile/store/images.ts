import { ref } from 'vue'
import { useStore } from '.'
import { fetcher } from '@composables/fetcher'
import { useImageStore, useUserStore } from '@stores'
import { clearCropper } from './cropper'
import { $img } from '@composables'

export interface ImagesResponse {
  avatar: string | undefined
  images: string[]
}

export const isViewerActive = ref(false)
export const currentImageIndex = ref(0)
export const $viewer: any = ref(undefined)

// Обновляю аватар и фотки в сторе после манипулиции с ономи
export function updateImages(r: ImagesResponse): void {
  clearCropper()
  useStore().$viewer?.hide()

  const $user = useStore().user
  if (!$user) return
  $user.avatar = r.avatar
  $user.images = r.images
  useUserStore().avatar = r.avatar ?? '/no-photo.webp'

  if ($user.avatar === '/no-photo.webp' || $user.images[0]?.split('/').slice(0, -1).pop() !== '0') {
    $user.avatar = undefined
    useUserStore().avatar = undefined
  }

  // recache
  if ($user?.images)
    for (const src of $user.images) useImageStore().recache[$img(src, 'user/user')] = true

  useImageStore().recache[$img($user.avatar ?? '/no-photo.webp', 'user/user')] = true
}

export function deleteImage(): void {
  const $user = useStore().user
  if (!$user || !$user.images) return

  const index = $user.images[currentImageIndex.value].split('/').splice(-2)[0]
  fetcher.delete(`user/user/delete-img?index=${index}`)
  $user.images.splice(currentImageIndex.value, 1)

  if ($user.images.length === 0) $user.avatar = undefined
  const r: ImagesResponse = { avatar: $user.avatar, images: $user.images }
  updateImages(r)
}
