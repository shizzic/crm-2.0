export interface Lang {
  [index: string]: any // {access: {}, Reports: "", "some": {list: ["1", "2", "3"]}}
}

export type List =
  | undefined
  | null
  | any[]
  | {
      id: number
      title?: string
      [k: string]: any
    }[]

export type Merge = (obj1: any, obj2: any) => any
export type ImageLoader = (name: string, controller_model?: string) => string

// recursive
export interface CSS {
  [k: string]: any
}
