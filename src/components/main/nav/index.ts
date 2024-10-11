import { createNanoEvents } from 'nanoevents'

export type Menu = Item[]

export interface Item {
  name: string
  alias?: string
  icon?: string
  list?: Item[]
}

type Events = {
  select: (value: boolean) => boolean
}

export const emitter = createNanoEvents<Events>()
