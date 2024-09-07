export interface Lang {
  [index: string]: any // {access: {}, Reports: "", "some": {list: ["1", "2", "3"]}}
}

export interface List {
  id: number
  title?: string
  [l: string]: any
}

export type Merge = (obj1: any, obj2: any) => any

// recursive
export interface CSS {
  [k: string]: CSS | string | number
}
