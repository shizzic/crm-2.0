import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import type { ModelRef, Ref, ShallowRef } from 'vue'
import { defaultProps } from '..'
import type { Props, InputModel } from '..'
import { $merge } from '@assets/composables'
import { getIcon } from './icon'
import type { Icon } from './icon'
import clone from 'clone'

export const useStore = (id: string | number) =>
  defineStore(`input/${id}`, () => {
    const props = ref(defaultProps)
    const model: InputModel = ref('') // value
    const v: Ref<any> | ModelRef<any> = ref(undefined) // валидатор vuelidate
    const errors = computed(() => getErrors())
    const pattern = computed(() => getPattern()) // актуальный input pattern (зависит от ошибки или ее отсутствия)
    const icon: Ref<undefined | Icon> = ref(undefined)

    // отслеживаю изменения для родителя (если параметры вообще были переданы)
    function setWatchers(passedModel: InputModel, passedV: ModelRef<any>): void {
      if (passedModel.value !== undefined) {
        watch(passedModel, (value) => (model.value = value))
        watch(model, (value) => (passedModel.value = value))
      }

      if (passedV.value !== undefined)
        watch(passedV, (value) => (v.value = clone(value)), { deep: true })
    }

    // получение props через passedProps со слиянем
    function setParams(
      passedProps: ModelRef<Props | undefined>,
      passedModel: InputModel,
      passedV: ModelRef<any>,
      passedInputTemplate: Readonly<ShallowRef<HTMLInputElement | null>>
    ): void {
      props.value = $merge(props.value, passedProps?.value)
      model.value = passedModel.value
      v.value = clone(passedV.value)

      if (passedProps.value !== undefined)
        watch(
          passedProps,
          (value) => {
            props.value = $merge(props.value, value)
            icon.value = getIcon(props.value, passedInputTemplate.value?.clientHeight)
          },
          { deep: true }
        )

      // как только input отрисуется, я высчитываю размер иконки (если ее нужно отобразить)
      watch(
        () => passedInputTemplate.value?.clientHeight,
        (value) => (icon.value = getIcon(props.value, value))
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
      setWatchers,
      setParams
    }
  })
