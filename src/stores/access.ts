import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { List } from '@types'
import { useHttpStore, useProjectStore, useUserStore } from '@stores'
import { setInterval, clearInterval } from 'worker-timers'

interface Access {
  [k: number]: number
}

export const useAccessStore = defineStore(
  'access',
  () => {
    const list: Ref<Access> = ref({})
    const roles: Ref<List> = ref([])
    const is_manager = ref(false)
    const updater: any = ref()

    function updateAccess(): void {
      if (useUserStore().isLoggedIn && useProjectStore().id)
        fetch(useHttpStore().$endpoint + 'access-component/check-access', {
          headers: useHttpStore().authorize_headers() as HeadersInit,
          credentials: 'include'
        })
          .then((data) => {
            return data.json()
          })
          .then((data) => {
            // if (data.data && data.data.reason) {
            //   this.$store.commit("SET_ACCESS", {})
            //   this.http({ message: data.data.reason })
            // }

            if (data?.data?.access) list.value = data.data.access

            if (data?.data?.role) {
              roles.value = [String(data.data.role.title)]
              is_manager.value = Boolean(data.data.role.is_manager)
            }
          })
    }

    function setUpdater(): void {
      updateAccess()
      updater.value = setInterval(
        updateAccess,
        1000 * 60 * 3 // каждые 3 минуты обновляю весь список доступов юзера
      )
    }

    function clearUpdater(): void {
      clearInterval(updater.value)
    }

    return { list, roles, setUpdater, clearUpdater }
  },
  {
    persist: [
      {
        storage: localStorage,
        pick: ['roles']
      },
      {
        storage: sessionStorage,
        pick: ['list']
      }
    ]
  }
)
