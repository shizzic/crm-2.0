import { getActivePinia, defineStore } from 'pinia'
import type {
  PiniaPluginContext,
  StateTree,
  StoreDefinition,
  _GettersTree,
  _ActionsTree
} from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { useUserStore, useSettingsStore, useImageStore } from '@stores'
import { fetcher } from '@composables/fetcher'
import { setTimeout, clearTimeout, setInterval, clearInterval } from 'worker-timers'
import clone from 'clone'

export interface UserSettingsResponse {
  avatar: string
  settings: {
    [index: string]: any
  }
}

const filename = 'settingsV2'
const timeTillSettingsSaving: Ref<number | null> = ref(null) // каждое изменение fields, тригерит запуск отчета времени до фетча на сохранение settings etc.
const applierInterval: Ref<number | null> = ref(null) // интервал самоуничтожится, как только все нужные сторы инициализируются и пройдут через applier настроек

export function saveUserSettings(): void {
  if (timeTillSettingsSaving.value !== null) {
    clearTimeout(timeTillSettingsSaving.value)
    timeTillSettingsSaving.value = null
  }

  timeTillSettingsSaving.value = setTimeout(uploadSettings, 1000)
}

function uploadSettings(): void {
  if (!useUserStore().isLoggedIn) return
  const request: any = {
    settings: JSON.parse(localStorage.getItem('settings') ?? JSON.stringify({})),
    sidebar: JSON.parse(localStorage.getItem('sidebar') ?? JSON.stringify({})),
    nav: JSON.parse(localStorage.getItem('nav') ?? JSON.stringify({}))
  }
  fetcher.put(`user/user/set-user-settings?filename=${filename}`, request)
}

export async function loadUserSettings(): Promise<void> {
  if (!useUserStore().isLoggedIn) return
  const $settings = useSettingsStore()
  $settings.replicas = await fetcher.get(`user/user/get-user-settings?filename=${filename}`)
  if ($settings.replicas) useImageStore().recache[$settings.replicas.avatar] = true
  else return

  applierInterval.value = setInterval(() => {
    if (
      applierInterval.value &&
      $settings.replicas &&
      Object.keys($settings.replicas.settings).length === 0
    ) {
      clearInterval(applierInterval.value)
      applierInterval.value = null
    }

    applyLoadedSettings()
  }, 100)
}

// лучше чем в 1 версии, 0 ошибок, type safe, reset затрагивает только конкретный стор, все данные ресетится не будут, как раньше
function applyLoadedSettings(): void {
  const replicas = useSettingsStore().replicas?.settings
  if (!replicas || Object.keys(replicas)?.length === 0) return
  const activepinia = getActivePinia()
  if (!activepinia) return

  for (const storeName in replicas) {
    try {
      const storeDefinition: StoreDefinition<string, {}, {}, {}> = defineStore(
        storeName,
        clone(activepinia.state.value[storeName])
      )
      const store: StateTree = storeDefinition(activepinia)
      const replica = replicas[storeName]

      // лучше всего ожидать, что реплика и нынешний стор имеют version field внутри, иначе просто не подменять
      if ('version' in store && 'version' in replica) {
        const replicaVersion = replica.version as number
        const storeVersion = store.version as number
        const initStoreVersion = store.$initialState.version as number
        const ls = JSON.parse(localStorage.getItem(storeName) ?? JSON.stringify({})) // localStorage
        const ss = JSON.parse(sessionStorage.getItem(storeName) ?? JSON.stringify({})) // sesstionStorage

        if (storeVersion <= replicaVersion && replicaVersion === initStoreVersion) {
          for (const fieldName in replica) {
            const field: any = replica[fieldName]

            // вношу изменения только к существующим полям, а так же только к тем, которые сохраняются в localStorage или sessionStorage в актуальной версии
            if (!(fieldName in store.$initialState && (fieldName in ls || fieldName in ss)))
              continue

            // если не удается назначить значение из реплики по любой причине, то беру актуальное начальное значение для данного поля
            try {
              store[fieldName as keyof typeof store.$initialState] = field
            } catch {
              store[fieldName as keyof typeof store.$initialState] = clone(
                store.$initialState[fieldName]
              )
              continue
            }
          }
        } else {
          // если версия актуального стора превышает версию в localStorage, то очищаю весь стор
          if (storeVersion < initStoreVersion) store.$reset()
        }
      }

      delete replicas[storeName] // убираю использованную реплику из загруженного обьекта, чтобы обнулить его
    } catch {
      continue
    }
  }
}

// каждый стор, который использует persist plugin, в хуке afterHydrate использует эту функцию,
// чтобы при измении persistable fields (watch) сохранять их состояние на сервере
// watch накладывается только на
// в persist плагину обязательно нужно ложить localStorage на певрое место (0 индекс), так как если persist работает на оба стора (local and session),
// то определить какой именно индекс относится к localStorage невозможно
export function watchPersistableFields(
  data: PiniaPluginContext<string, StateTree, _GettersTree<StateTree>, _ActionsTree>
): void {
  const persist = data.options.persist?.[0 as keyof typeof data.options.persist] as any

  if (persist) {
    const pick: string[] = persist.pick
    const watchable: ComputedRef<any>[] = []
    for (const fieldName of pick) watchable.push(computed(() => data.store[fieldName]))
    if (watchable.length > 0) watch(watchable, () => saveUserSettings())
  }
}
