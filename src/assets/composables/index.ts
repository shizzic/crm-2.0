import { toValue } from 'vue'
import type { ImageLoader, GetDeep, Deep, GetParsedDate } from '@types'
import { useHttpStore, useSettingsStore } from '@stores'
import clone from 'clone'
import deepmerge from '@fastify/deepmerge'

// получаю полный путь до фотки (local | url | blob) -> indiferent
export const $img: ImageLoader = (name: string, controller_model?: string): string => {
  name = name.replace(/^\//, '')

  if (name.search('blob:') === -1) {
    const url = (controller_model ? controller_model : '') + '/get-file?file='

    return name.search('\\?') === -1
      ? 'src/assets/images/' + name
      : useHttpStore().$endpoint + url + name.split('?').shift()
  } else return name
}

// иду в глубину до искомого ключа или возвращаю максимально доступную глубину
//  так как возможно, что нам потребуется получить еще 1 глубину с помощью ключа, но применить этот ключ на не итерируемые значения нельзя
//  поэтому возвращаю допустимый макисмум
export const $getDeep: GetDeep = (data: any, deep: Deep): any => {
  data = toValue(data)
  deep = clone(deep)

  if (!data || (data && !data?.[deep?.[0]])) return data

  const deeper = data[deep[0]]
  deep.shift()
  return deep.length === 0 ? deeper : $getDeep(deeper, deep)
}

export const $merge: (arg1: any, arg2: any) => any = (arg1: any, arg2: any): any => {
  return deepmerge({ mergeArray: replaceByClonedSource })(arg1, arg2)
}

function replaceByClonedSource() {
  return function (...args: any[]) {
    return clone(args[args.length - 1])
  }
}

export const $getParsedDate: GetParsedDate = (
  timestamp: number | string | undefined | null
): string => {
  if (!timestamp) return ''

  const date = new Date(Number(timestamp) * 1000)
  if (!date) return ''
  const locales = `${useSettingsStore().locale.toLowerCase()}-${useSettingsStore().locale}`

  if (useSettingsStore().month === 'number')
    return date.toLocaleDateString(locales, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  else
    return date.toLocaleDateString(locales, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
}
