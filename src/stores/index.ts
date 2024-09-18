export * from './user'
export * from './http'
export * from './settings/main'
export * from './sse/device'
export * from './project'
export * from './domain'
export * from './access'

import clone from 'clone'
import { getActivePinia, defineStore } from 'pinia'

// $reset method for pinia composition api
export function addResetMethod({ store }: any): void {
  const initialState = clone(store.$state)
  store.$reset = () => {
    store.$patch(($state: any) => {
      Object.assign($state, initialState)
    })
  }
}

export function resetAllStores(except?: string[]): void {
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
