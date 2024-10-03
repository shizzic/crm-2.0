import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { ModelRef, Ref } from 'vue'
import { defaultProps } from '..'
import type { Props, Model } from '..'
import { $merge } from '@assets/composables'

export const useStore = (id: string) =>
  defineStore(`file/${id}`, () => {
    const props = ref(defaultProps)
    const model: Ref<Model> = ref(FileList)

    // отслеживаю изменения для родителя (если параметры вообще были переданы)
    function setWatchers(passedModel: ModelRef<Model>): void {
      if (passedModel.value !== undefined) {
        watch(passedModel, (value) => (model.value = value))
        watch(model, (value) => (passedModel.value = value))
      }
    }

    // получение props через passedProps со слиянем
    function setParams(
      passedProps: ModelRef<Props | undefined>,
      passedModel: ModelRef<Model>
    ): void {
      props.value = $merge(props.value, passedProps?.value)
      model.value = passedModel.value

      if (passedProps.value !== undefined)
        watch(passedProps, (value) => (props.value = $merge(props.value, value)), { deep: true })
    }

    return {
      props,
      model,
      setParams,
      setWatchers
    }
  })
