import { useSettingsStore } from '@stores'
import { $getDeep } from '@composables'
import { useStore } from '.'
import type { StoreID } from '@types'

// текст default блока
export const $getText = ($id: StoreID): string => {
  const $store = useStore($id)()

  if (!$store.props.multiple)
    return $getDeep(
      $store.props.wrapper.list?.[String($store.index)],
      $store.props.wrapper.deep || []
    )

  return $store.props.wrapper.text || useSettingsStore().lang?.other?.select
}

export const clearModel = ($id: StoreID): void => {
  const $store = useStore($id)()
  if (!$store.props.multiple) {
    const old = $store.model
    $store.model = undefined
    $store.index = undefined

    if (old) $store.model.props.active = false
  }
}
