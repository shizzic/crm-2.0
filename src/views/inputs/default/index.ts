import type { CSS } from '@types'
import { useSettingsStore } from '@stores'
import type { Icon } from './store/icon'

export type Model = string

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
  icon?: Icon
}

export const DefaultCSS: CSS = {
  default: {
    width: '100%',
    color: 'var(--input-color)',
    fontFamily: 'Metropolis, sans-serif',
    fontWeight: '500',
    fontSize: '16.44rem',
    border: '2px solid',
    borderColor: '#C4C4C4',
    borderRadius: '110px',
    backgroundColor: 'var(--input-backgroundColor)',

    padding: '10rem 21rem'
  },

  placeholder: {
    color: 'var(--input-hover-color)'
  }
}

export const defaultProps: Props = {
  autocomplete: 'on',
  autocorrect: 'on',
  placeholder: useSettingsStore().lang?.other?.text,

  label: false,
  css: DefaultCSS,
  icon: {
    position: 'left 15rem center',
    repeat: 'no-repeat'
  }
}
