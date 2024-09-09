import type { Merge } from '@types'

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
