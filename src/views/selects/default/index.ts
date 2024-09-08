import type { CSS } from '@types'

export interface Props {
  // input attributes
  name?: string | undefined
  form?: string | undefined
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
  ul: {
    default: {
      width: '100%',
      color: '#000',
      fontFamily: 'Metropolis, sans-serif',
      fontWeight: 'Medium',
      fontSize: '13rem',
      border: '2px solid',
      borderColor: '#C4C4C4',
      borderRadius: '110px',
      backgroundColor: '#ffffff',

      padding: '7px 21px'
    },

    hover: {}
  }
}
