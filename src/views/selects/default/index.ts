import type { CSS } from '@types'

export interface Props {
  work: {
    list: any
    render: string
    text?: string
  }
  // input attributes
  name?: string
  form?: string
  autofocus?: boolean
  required?: boolean
  multiple?: boolean
  disabled?: boolean

  // other
  label?: boolean
  labelText?: string
  css?: CSS
}

export const DefaultCSS: CSS = {
  default: {
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    color: '#676767',
    fontFamily: 'Metropolis, sans-serif',
    fontWeight: '500',
    fontSize: '13rem',
    border: '2px solid',
    borderColor: '#C4C4C4',
    borderRadius: '110px',
    backgroundColor: '#ffffff',

    padding: '7px 21px'
  },

  hover: {
    backgroundColor: '#ffffff'
  }
}
