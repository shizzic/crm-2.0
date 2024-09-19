import type { CSS } from '@types'
import { createNanoEvents } from 'nanoevents'

export interface Props {
  event: string
  text?: string
  css?: CSS
}

export const DefaultCSS: CSS = {
  default: {
    cursor: 'pointer',
    width: 'max-content',
    color: '#4D5DFA',
    fontFamily: 'inherit',
    fontWeight: '600',
    fontSize: '16.44rem',
    border: 'none',
    borderRadius: '110px',
    backgroundColor: '#F2F4F6',

    padding: '10px 21px'
  },

  hover: {
    backgroundColor: '#e2e3e4'
  }
}

type Events = {
  [k: string]: () => void
}

export const emitter = createNanoEvents<Events>()
