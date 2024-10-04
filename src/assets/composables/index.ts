import { unref } from 'vue'
import type { Merge, ImageLoader, GetDeep, Deep } from '@types'
import { useHttpStore } from '@stores'
import clone from 'clone'
import deepmerge from '@fastify/deepmerge'
const $endpoint = useHttpStore().$endpoint

// получаю полный путь до фотки (local | url | blob) -> indiferent
export const $img: ImageLoader = (name: string, controller_model?: string): string => {
  name = name.replace(/^\//, '')

  if (name.search('blob:') === -1) {
    const url = (controller_model ? controller_model : '') + '/get-file?file='

    return name.search('\\?') === -1
      ? 'src/assets/images/' + name
      : $endpoint + url + name.split('?').shift()
  } else return name
}

// иду в глубину до искомого ключа или возвращаю максимально доступную глубину
//  так как возможно, что нам потребуется получить еще 1 глубину с помощью ключа, но применить этот ключ на не итерируемые значения нельзя
//  поэтому возвращаю допустимый макисмум
export const $getDeep: GetDeep = (data: any, deep: Deep): any => {
  data = unref(data)
  deep = clone(deep)

  if (!data || (data && !data?.[deep?.[0]])) return data

  const deeper = data[deep[0]]
  deep.shift()
  return deep.length === 0 ? deeper : $getDeep(deeper, deep)
}

export const $merge: Merge = (...args): any => {
  return deepmerge({ mergeArray: replaceByClonedSource })(...args)
}

function replaceByClonedSource() {
  return function (...args: any[]) {
    return clone(args[args.length - 1])
  }
}
