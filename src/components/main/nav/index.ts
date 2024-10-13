export type Menu = Item[]

export interface Item {
  name: string
  alias?: string
  icon?: string
  list?: Item[]
}
