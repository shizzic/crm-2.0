import type { Index, StoreID } from '@types'
import { useStore } from '.'

export const $select = ($id: StoreID, li: any, i: Index): void => {
  const $store = useStore($id)()
  $store.model = li
  $store.index = i

  // закрыть селект, если он не multiple
  if (!$store.props.multiple) $store.props.active = false
  else {
    // если выбронное кол-во элементов равно кол-ву элементов в списке, то закрыть селект
    const length = Array.isArray($store.props.wrapper.list)
      ? $store.props.wrapper.list.length
      : Object.keys(Object.assign({}, $store.props.wrapper.list)).length

    if ($store.model.value?.length === length) $store.props.active = false
  }
}

// проверить элемент на сходство с поиском
export const isSearched = ($id: StoreID, text: string): boolean => {
  const $store = useStore($id)()

  const search = $store.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(search, $store.props.wrapper.flags)
  return pattern.test(text)
}

// проверить, выбран ли элемент списка
export const isSelected = ($id: StoreID, i: Index): boolean => {
  const $store = useStore($id)()
  return i == $store.index
}
