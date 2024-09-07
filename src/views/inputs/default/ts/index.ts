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

// recursive
export interface CSS {
  [k: string]: CSS | string | number
}
