export * from './user'
export * from './http'
export * from './settings'
export * from './sse/device'
export * from './project'
export * from './domain'
export * from './access'
export * from './image'
export * from './components'
export * from '@components/main/sidebar/store'

import { getActivePinia, defineStore } from 'pinia'
import clone from 'clone'

// $reset method for pinia composition api
export function addResetMethod({ store }: any): void {
  const initialState = clone(store.$state)
  store.$initialState = initialState
  store.$reset = () => {
    store.$patch(($state: any) => {
      Object.assign($state, initialState)
    })
  }
}

// активация $reset метода для всех сторов, кроме исключений (во время выхода юзера из аккаунта)
export function resetAllStores(...except: string[]): void {
  const activepinia = getActivePinia()
  if (activepinia) {
    Object.entries(activepinia.state.value).forEach(([storeName, state]) => {
      if (except?.includes(storeName)) return
      const storeDefinition = defineStore(storeName, state)
      const store = storeDefinition(activepinia)
      store.$reset()
    })
  }
}
