export interface Props {
  text: string
  css?: CSS
}

// recursive
export interface CSS {
  [k: string]: CSS | string | number
}
