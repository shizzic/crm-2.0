import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { ModelRef, Ref } from 'vue'
import { defaultProps } from '..'
import type { Props, Model } from '..'
import { $merge } from '@assets/composables'
import type { Index, StoreID } from '@types'

export const useStore = (id: StoreID) =>
  defineStore(`radio/${id}`, () => {
    const props = ref(defaultProps)
    const model: Ref<Model> = ref(undefined) // value
    const index: Ref<Index> = ref(undefined) // value

    // отслеживаю изменения для родителя (если параметры вообще были переданы)
    function setWatchers(passedModel: ModelRef<Model>, passedIndex: ModelRef<Index>): void {
      if (passedModel.value !== undefined) {
        watch(passedModel, (value) => {
          model.value = value
          mergeIndexWithModel(passedIndex, passedModel)
        })
        watch(model, (value) => (passedModel.value = value))
      }

      if (passedIndex.value !== undefined) {
        watch(passedIndex, (value) => {
          index.value = value
          mergeIndexWithModel(passedIndex, passedModel)
        })
        watch(index, (value) => (passedIndex.value = value))
      }
    }

    // получение props через passedProps со слиянем
    function setParams(
      passedProps: ModelRef<Props>,
      passedModel: ModelRef<Model>,
      passedIndex: ModelRef<Index>
    ): void {
      props.value = $merge(props.value, passedProps.value)
      model.value = passedModel.value
      index.value = passedIndex.value

      if (index.value !== undefined && props.value.list)
        model.value = props.value.list[index.value as keyof typeof props.value.list]

      if (passedProps.value !== undefined)
        watch(
          passedProps,
          (value) => {
            props.value = $merge(props.value, value)
            mergeIndexWithModel(passedIndex, passedModel)
          },
          { deep: true }
        )

      mergeIndexWithModel(passedIndex, passedModel)
    }

    // Связываю index с model. Так как к переданному списку может быть передана только model без index и наоборот.\n
    // Нужно найти эту связь и подставить ее.
    function mergeIndexWithModel(passedIndex: Ref<Index>, passedModel: Ref<Model>): void {
      if (!props.value.list) return

      if (passedModel.value !== undefined && passedIndex.value === undefined) {
        for (const i in props.value.list) {
          const item = props.value.list[i]

          if (
            (passedModel.value?.id && passedModel.value.id == item.id) ||
            JSON.stringify(item) === JSON.stringify(passedModel.value)
          ) {
            index.value = i
            break
          }
        }
      }

      if (passedIndex.value !== undefined && passedModel.value === undefined) {
        for (const i in props.value.list)
          if (JSON.stringify(i) === JSON.stringify(passedIndex.value)) {
            model.value = props.value.list[i]
            break
          }
      }
    }

    function set(item: Model, i: Index): void {
      model.value = item
      index.value = i
    }

    return {
      props,
      model,
      index,
      setWatchers,
      setParams,
      set
    }
  })
