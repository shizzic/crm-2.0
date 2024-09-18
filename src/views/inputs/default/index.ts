import type { CSS } from '@types'

export interface Props {
  v?: { [k: string]: any } // валидатор vuelidate

  // input attributes
  name?: string
  type?: string
  placeholder?: string
  maxlength?: number
  minlength?: number
  autofocus?: boolean
  autocomplete?: string
  autocorrect?: string
  id?: string
  readonly?: boolean
  pattern?: string

  // other
  label?: boolean
  labelText?: string
  css?: CSS
  icon?: string
}

export const DefaultCSS: CSS = {
  default: {
    width: '100%',
    color: '#000',
    fontFamily: 'Metropolis, sans-serif',
    fontWeight: 'Medium',
    fontSize: '16.44rem',
    border: '2px solid',
    borderColor: '#C4C4C4',
    borderRadius: '110px',
    backgroundColor: '#ffffff',

    padding: '10px 21px'
  },

  placeholder: {
    color: '#676767'
  }
}
