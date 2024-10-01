import type { CSS } from '@types'

export type Props =
  | {
      content?: string
      hover?: boolean
      arrow?: boolean
      css?: CSS
    }
  | undefined

export const DefaultCSS: CSS = {
  default: {
    width: '100%',
    color: '#000',
    fontFamily: 'Metropolis, sans-serif',
    fontWeight: '600',
    fontSize: '16.44rem',
    border: '2px solid',
    borderColor: '#C4C4C4',
    borderRadius: '110px',
    backgroundColor: '#ffffff',

    padding: '10px 21px'
  }
}

export const defaultProps: Props = {
  content: '',
  hover: true,
  arrow: true,
  css: DefaultCSS
}
