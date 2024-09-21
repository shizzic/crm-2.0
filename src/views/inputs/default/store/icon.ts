import type { Props } from '..'
import { getFilter } from '@assets/composables/icon'
import { $img } from '@assets/composables'

export interface Icon {
  url?: string
  size?: string
  position?: string
  repeat?: string
  filter?: string
}

export const getIcon = (props: Props): Icon => {
  const url = `url(${$img(String(props.icon?.url))})`
  const size = props.icon?.size
  const position = props.icon?.position
  const repeat = props.icon?.repeat
  const filter = getFilter(props.icon?.filter || props.css?.placeholder.color)

  return { url, size, position, repeat, filter }
}
