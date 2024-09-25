import { unref } from 'vue'
import type { Merge, ImageLoader, GetDeep, Deep } from '@types'
import { useHttpStore } from '@stores'
const $endpoint = useHttpStore().$endpoint

export const $merge: Merge = (obj1: any, obj2: any): any => {
  obj1 = unref(obj1) // делаю unref, чтобы избавиться от inner refs, так как данная функция не умеет работать с ними и хочет получить plain object
  obj2 = unref(obj2) // делаю unref, чтобы избавиться от inner refs, так как данная функция не умеет работать с ними и хочет получить plain object
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

// получаю полный путь до фотки (local | url | blob) -> indiferent
export const $img: ImageLoader = (name: string, controller_model?: string): string => {
  if (name.search('blob:') === -1) {
    const url = (controller_model ? controller_model : '') + '/get-file?file='

    return name.search('\\?') === -1
      ? 'src/assets/images' + name
      : $endpoint + url + name.split('?').shift()
  } else return name
}

// иду в глубину до искомого ключа или возвращаю максимально доступную глубину
// так как возможно, что нам потребуется получить еще 1 глубину с помощью ключа, но применить этот ключ на не итерируемые значения нельзя
// поэтому возвращаю допустимый макисмум
export const $getDeep: GetDeep = (data: any, deep: Deep): any => {
  data = unref(data)
  if (!data || (data && !data?.[deep?.[0]])) return data

  if (deep.length > 1) deep.shift()
  return $getDeep(data[deep[0]], deep)
}
