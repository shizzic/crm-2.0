import type { Props } from '..'
import { hexToCSSFilter } from 'hex-to-css-filter'
import type { HexToCssConfiguration } from 'hex-to-css-filter'

export interface Icon {
  background: string
  filter: string
}

export const getIcon = (props: Props): Icon => {
  const background = `url(${props.icon}) left no-repeat`
  const colorFilterConfig: HexToCssConfiguration = {
    acceptanceLossPercentage: 1,
    maxChecks: 10,
    forceFilterRecalculation: true
  }
  // css filter style
  const filter = hexToCSSFilter(props.css?.placeholder.color, colorFilterConfig).filter.slice(0, -1)
  return { background, filter }
}
