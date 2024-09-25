export interface Lang {
  [index: string]: any // {access: {}, Reports: "", "some": {list: ["1", "2", "3"]}}
}

export type StoreID = string
export type List = any
export type Index = number | string | undefined
export type Deep = (string | number)[]

export type Merge = (obj1: any, obj2: any) => any
export type ImageLoader = (name: string, controller_model?: string) => string
export type GetDeep = (data: any, deep: Deep) => any

// recursive
export interface CSS {
  [k: string]: any
}
