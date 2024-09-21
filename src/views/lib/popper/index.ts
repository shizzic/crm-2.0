import type { CSS } from '@types'
import { ref, watch } from 'vue'
import type { ModelRef, Ref } from 'vue'
import { $merge } from '@assets/composables'

export interface Props {
  content: string
  hover?: boolean
  arrow?: boolean
  css?: CSS
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
  }
}

export const defaultProps: Props = {
  content: '',
  hover: true,
  arrow: true,
  css: DefaultCSS
}

// получение props через passedProps со слиянем вместе с дефолтными + отслеживание изменений
export const getProps = (passedProps: ModelRef<Props>): Ref<Props> => {
  const props = ref(passedProps.value)
  props.value = $merge(defaultProps, passedProps.value)
  watch(passedProps, (value) => (props.value = $merge(props.value, value)), { deep: true })
  return props
}
