import type { CSS } from '@types'

export type Model = FileList

export interface Props {
  attributes?: {
    name?: string
    accept?: string

    multiple?: boolean
    required?: boolean
    autofocus?: boolean
    disabled?: boolean
  }

  css?: CSS
}

export const defaultProps: Props = {}

export const DefaultCSS: CSS = {
  default: {
    cursor: 'pointer',
    width: 'max-content',
    color: '#ffffff',
    fontFamily: 'Metropolis, sans-serif',
    fontWeight: '500',
    fontSize: '16.44rem',
    border: 'none',
    borderColor: 'transparent',
    borderRadius: '110px',
    backgroundColor: '#4D5DFA',

    padding: '10rem 21rem',
    margin: '0'
  },

  hover: {
    backgroundColor: '#1f32dd'
  }
}
