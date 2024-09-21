import { hexToCSSFilter } from 'hex-to-css-filter'
import type { HexToCssConfiguration } from 'hex-to-css-filter'

export const getFilter = (color: string | undefined): string => {
  const colorFilterConfig: HexToCssConfiguration = {
    acceptanceLossPercentage: 1,
    maxChecks: 10,
    forceFilterRecalculation: true
  }

  return hexToCSSFilter(String(color), colorFilterConfig).filter.slice(0, -1)
}
