import type { ModelRef, Ref } from 'vue'
import type { CSS } from '@types'
import { useSettingsStore } from '@stores'

export type InputModel = ModelRef<string> | Ref<string>

export interface Props {
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

export const defaultProps: Props = {
  autocomplete: 'on',
  autocorrect: 'on',
  placeholder: useSettingsStore().lang?.other?.text,

  label: false,
  css: DefaultCSS
}
