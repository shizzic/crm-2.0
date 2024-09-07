export interface Lang {
  [index: string]: any // {access: {}, Reports: "", "some": {list: ["1", "2", "3"]}}
}

export type Merge = (obj1: any, obj2: any) => any
