import { defineStore } from 'pinia'
import { set } from '@stores/reusable/funcs'
import { ref, watch, computed } from 'vue'
import type { ModelRef, Ref } from 'vue'
import { defaultProps } from '..'
import type { Props, InputModel } from '..'
import { $merge } from '@assets/composables'
import { getIcon } from './icon'
import type { Icon } from './icon'

export const useStore = (id: string | number) =>
  defineStore(`input/${id}`, () => {
    const props = ref(defaultProps)
    const model: InputModel = ref('') // value
    const v: Ref<any> | ModelRef<any> = ref(undefined) // валидатор vuelidate
    const errors = computed(() => getErrors())
    const pattern = computed(() => getPattern()) // актуальный input pattern (зависит от ошибки или ее отсутствия)
    const icon: Ref<undefined | Icon> = ref(undefined)

    // получение props через passedProps со слиянем вместе с дефолтными + отслеживание изменений
    function setProps(
      passedProps: ModelRef<Props | undefined>,
      passedModel: InputModel,
      passedV: ModelRef<any>
    ): void {
      props.value = $merge(props.value, passedProps?.value)
      icon.value = getIcon(props.value)
      model.value = passedModel.value
      v.value = passedV.value
      watch(
        () => passedProps,
        (value) => {
          props.value = $merge(props.value, value.value)
          icon.value = getIcon(props.value)
        },
        { deep: true }
      )
      watch(
        () => passedModel,
        (value) => (model.value = value.value)
      )
      watch(
        () => passedV,
        (value) => (v.value = Object.assign({}, value.value)),
        { deep: true }
      )
    }

    // текст ошибок зависит от model (связь не очевидная, ошибки меняются снаружи инпут компонента)
    function getErrors() {
      const r: string[] = []
      if (v.value?.$silentErrors) for (const item of v.value.$silentErrors) r.push(item.$validator)
      return r
    }

    function getPattern(): string | undefined {
      if (v.value?.$silentErrors)
        for (const item of v.value.$silentErrors)
          if (item.$params?.pattern) return item.$params.pattern

      return undefined
    }

    return {
      props,
      model,
      v,
      errors,
      pattern,
      icon,
      setProps,
      set
    }
  })
