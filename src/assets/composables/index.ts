import { computed } from 'vue'
import type { Merge, ImageLoader, Lang } from '@types'
import { useHttpStore, useSettingsStore } from '@stores'
const $endpoint = useHttpStore().$endpoint

// хранилище всех переводов
export const $lang: Lang = computed(() => useSettingsStore().lang)

export const $merge: Merge = (obj1: any, obj2: any): any => {
  const result = { ...obj1 }

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        result[key] = $merge(obj1[key], obj2[key])
      } else {
        result[key] = obj2[key]
      }
    }
  }

  return result
}

export const $img: ImageLoader = (name: string, model: string, media: string): string => {
  if (name)
    if (name.search('blob:') === -1) {
      model += (!model ? media : '') + '/get-file?file='

      return name.search('\\?') === -1
        ? '/images' + name
        : $endpoint + model + name.split('?').shift()
    } else return name

  return ''
}
