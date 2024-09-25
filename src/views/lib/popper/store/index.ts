import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Ref, ModelRef } from 'vue'
import { defaultProps } from '..'
import type { Props } from '..'
import { $merge } from '@assets/composables'
import type { StoreID } from '@types'

export const useStore = (id: StoreID) =>
  defineStore(`popper/${id}`, () => {
    const props: Ref<Props> = ref(defaultProps)

    // получение props через passedProps со слиянем вместе с дефолтными + отслеживание изменений
    function setParams(passedProps: ModelRef<Props>): void {
      props.value = $merge(props.value, passedProps.value)

      if (passedProps.value !== undefined)
        watch(passedProps, (value) => (props.value = $merge(props.value, value)), { deep: true })
    }

    return { props, setParams }
  })
