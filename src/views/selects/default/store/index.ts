import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Ref, ModelRef } from 'vue'
import type { Model as Search } from '@views/inputs/default'
import { defaultProps } from '..'
import type { Props, Model } from '..'
import type { Index, StoreID } from '@types'
import { $merge } from '@composables'
import { $getText, clearModel } from './default'
import { isSearched, isSelected, $select } from './list'

export const useStore = ($id: StoreID) =>
  defineStore(`select/${$id}`, () => {
    const props: Ref<Props> = ref(defaultProps)
    const search: Ref<Search> = ref('')
    const model: Ref<Model> = ref(undefined) // value: li
    const index: Ref<Index> = ref(undefined) // value: index
    const text = computed(() => $getText($id)) // главный текст селекта

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
      index.value = passedIndex.value
      model.value = passedModel.value

      if (passedProps.value)
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
      if (!props.value.wrapper.list) return
      if (passedModel.value !== undefined && passedIndex.value === undefined) {
        for (const i in props.value.wrapper.list) {
          const item = props.value.wrapper.list[i]

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
        for (const i in props.value.wrapper.list)
          if (JSON.stringify(i) === JSON.stringify(passedIndex.value)) {
            model.value = props.value.wrapper.list[i]
            break
          }
      }
    }

    return {
      props,
      search,
      model,
      index,
      text,
      setParams,
      setWatchers,
      clearModel,
      isSearched,
      $select,
      isSelected
    }
  })
