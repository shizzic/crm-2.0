import CssFilterConverter from 'css-filter-converter'

export const getFilter = (color: string | undefined): string => {
  const parsed = CssFilterConverter.hexToFilter(String(color))
  return String(parsed?.color)
}
