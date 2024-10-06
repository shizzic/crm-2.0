import { ref } from 'vue'
import type { Ref } from 'vue'
import { fetcher } from '@composables/fetcher'
import type { Coordinates } from 'vue-advanced-cropper'
import type { ImagesResponse } from './images'
import { useStore } from '.'
import { serialize } from 'object-to-formdata'
import { updateImages } from './images'
import { $img } from '@composables'

export interface Cropper {
  active: boolean
  blob: string | undefined
  src: string | undefined
  file: File | undefined
}

export const cropper: Ref<Cropper> = ref({
  active: false,
  blob: undefined,
  src: undefined,
  file: undefined
})

// начать процесс кропа
export async function crop(index: number): Promise<void> {
  useStore().$viewer?.hide()
  const images = useStore().user?.images
  if (!images) return

  useStore().isViewerActive = false
  useStore().cropper.blob = await fetcher.blob.get($img(images[index], 'user/user'))
  useStore().cropper.src = images[index]
  useStore().cropper.active = true
}

// может быть изменение и фото и координат, а могут быть и только координаты без смены фото
export async function updateAvatar(src: string, coordinates: Coordinates): Promise<void> {
  const body = serialize({ src, coordinates })
  const r: ImagesResponse = await fetcher.media.put('user/user/set-avatar', body)
  const $user = useStore().user

  if ($user) {
    $user.avatar = r.avatar
    $user.images = r.images
  }

  updateImages(r)
}

export function setFreshAvatar(
  canvas: HTMLCanvasElement | undefined,
  file: File | undefined
): void {
  if (!canvas || !file) return
  canvas.toBlob(async (blob) => {
    if (!blob) return
    const body = new FormData()
    await body.append('cut', blob)
    await body.append('full', file)

    const r: ImagesResponse = await fetcher.media.post('user/user/save-avatar', body)
    updateImages(r)
  }, 'image/*')
}

export function clearCropper(): void {
  cropper.value.active = false
  cropper.value.blob = undefined
  cropper.value.src = undefined
  cropper.value.file = undefined
  useStore().isViewerActive = false
}
