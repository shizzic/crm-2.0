export * from '@/stores/user'
export * from '@/stores/http'
export * from '@/stores/settings/main'
export * from '@/stores/sse/device'
export * from '@/stores/project'
export * from '@/stores/access'

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
