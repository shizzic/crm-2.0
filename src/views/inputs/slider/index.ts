import type { CSS } from '@types'

export type Model = number | number[]
export interface Props {
  min: number
  max: number
  interval?: number
  tooltip?: string
  lazy?: boolean
  silent?: boolean // Set to true to turn off console errors
  dotSize?: number
  dotStyle?: CSS
  processStyle?: CSS // верхняя часть полоски
  railStyle?: CSS // нижняя часть полоски

  // other
  label?: boolean
  labelText?: string
  css?: CSS
}

export const DefaultCSS: CSS = {
  default: {
    width: '100%',
    padding: '0',
    margin: '0'
  }
}

export const defaultProps: Props = {
  min: 0,
  max: 100,
  interval: 1,
  tooltip: 'none',
  lazy: false,
  silent: true,
  dotSize: 14,
  dotStyle: {
    backgroundColor: 'var(--slider-dot-backgroundColor)'
  },
  processStyle: {
    backgroundColor: 'var(--slider-process-backgroundColor)',
    height: '6rem'
  },
  railStyle: {
    backgroundColor: 'var(--slider-rail-backgroundColor)',
    height: '6rem'
  },

  label: false,
  css: DefaultCSS
}
