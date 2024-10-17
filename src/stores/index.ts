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

// import { toRefs, ref, reactive } from 'vue'
// import { $merge } from '@composables'
import clone from 'clone'
import { getActivePinia, defineStore } from 'pinia'

// setTimeout(() => {
//   const pinia = getActivePinia()
//   if (pinia) {
//     const obj: any = { locale: 'RU' }
//     // for (const key in obj) pinia.state.value.settings[key] = obj[key]
//     // pinia.state.value.settings = ref($merge(pinia.state.value.settings, obj))
//     pinia.state.value.settings = toRefs(reactive($merge(pinia.state.value.settings, obj)))
//     // console.log(pinia.state.value.settings)
//   }
// }, 1500)

// $reset method for pinia composition api
export function addResetMethod({ store }: any): void {
  const initialState = clone(store.$state)
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
