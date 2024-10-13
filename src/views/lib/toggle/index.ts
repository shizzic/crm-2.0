import type { CSS } from '@types'

export type Model = boolean | number | string

export interface Props {
  attributes?: {
    id?: string
    name?: string
    required?: boolean
    disabled?: boolean

    trueValue?: boolean | number | string
    falseValue?: boolean | number | string
  }

  css?: CSS
}

export const DefaultCSS: CSS = {
  default: {
    width: '51rem',
    height: '23rem',
    borderWidth: '3px',

    bgOff: 'var(--color-4)',
    bgOn: 'var(--color-5)'
  }
}

export const defaultProps: Props = {
  css: DefaultCSS
}
