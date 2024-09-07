import type { CSS } from '@/assets/types'

export interface Props {
  // required
  v: { [k: string]: any } // валидатор vuelidate

  // input attributes
  name?: string | undefined
  type?: string | undefined
  placeholder?: string | undefined
  maxlength?: number | undefined
  minlength?: number | undefined
  autocomplete?: string | undefined
  autocorrect?: string | undefined
  id?: string | undefined
  readonly?: boolean
  pattern?: string | undefined

  // other
  label?: boolean
  labelText?: string
  css?: CSS
}

export const DefaultCSS: CSS = {
  default: {
    width: '100%',
    color: '#000',
    fontFamily: 'Metropolis, sans-serif',
    fontWeight: 'Medium',
    fontSize: '13.75px',
    border: '2px solid',
    borderColor: '#C4C4C4',
    borderRadius: '110px',
    backgroundColor: '#ffffff',

    padding: '7px 21px'
  },

  placeholder: {
    color: '#676767'
  }
}
