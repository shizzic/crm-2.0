import { ref } from 'vue'
import type { Ref } from 'vue'

export interface Cropper {
  active: boolean
  blob: string | undefined
  src: string | undefined
}

export const cropper: Ref<Cropper> = ref({
  active: false,
  blob: undefined,
  src: undefined
})

// export function getBlob(path): void {

// }
