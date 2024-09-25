import type { CSS, List, Deep } from '@types'

export type Model = any

export interface Props {
  list: List
  deep?: Deep

  // other
  label?: boolean
  labelText?: string
  css?: CSS
}

export const DefaultCSS: CSS = {
  default: {
    width: '100%',
    padding: '0',
    margin: '0'
  },

  dot: {
    height: '16rem',
    width: '16rem',
    border: '2px solid',
    borderColor: '#C4C4C4',
    paddingRight: '10px',

    Checked: {
      border: '4.5px solid',
      borderColor: '#4D5DFA'
    }
  },

  label: {
    fontSize: '14rem',
    fontWeight: '500',
    color: '#676767',

    padding: '7px 0'
  }
}

export const defaultProps: Props = {
  list: [],
  deep: [],

  label: false,
  css: DefaultCSS
}
