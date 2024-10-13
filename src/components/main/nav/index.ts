import { createNanoEvents } from 'nanoevents'

export type Menu = Item[]

export interface Item {
  name: string
  alias?: string
  icon?: string
  list?: Item[]
}

type Events = {
  closeList: () => void
}

export const emitter = createNanoEvents<Events>()
