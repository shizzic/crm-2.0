import type { CSS } from '@types'

export type Props =
  | {
      content?: string
      placement?:
        | 'bottom'
        | 'top'
        | 'auto'
        | 'auto-start'
        | 'auto-end'
        | 'top-start'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-end'
        | 'right'
        | 'right-start'
        | 'left'
      hover?: boolean
      arrow?: boolean
      interactive?: boolean
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

    padding: '10rem 21rem'
  }
}

export const defaultProps: Props = {
  content: '',
  placement: 'bottom',
  hover: true,
  arrow: true,
  interactive: true,
  css: DefaultCSS
}
