import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Ref, ModelRef } from 'vue'
import type { InputModel } from '@views/inputs/default'
import { useSettingsStore } from '@stores'
import { defaultProps } from '..'
import type { Props } from '..'
import { $merge } from '@assets/composables'

export const useStore = (id: string | number) =>
  defineStore(`select/${id}`, () => {
    const props: Ref<Props> = ref(defaultProps)
    const search: InputModel = ref('')
    const model: Ref<any> = ref(undefined) // value: li
    const index: Ref<undefined | string | number> = ref(undefined) // value: index
    const text = computed(() => getText()) // главный текст селекта

    // отслеживаю изменения для родителя (если параметры вообще были переданы)
    function setWatchers(
      passedModel: ModelRef<any>,
      passedIndex: ModelRef<undefined | string | number>
    ): void {
      if (passedModel.value !== undefined) {
        watch(passedModel, (value) => (model.value = value))
        watch(model, (value) => (passedModel.value = value))
      }

      if (passedIndex.value !== undefined) {
        watch(passedIndex, (value) => (index.value = value))
        watch(index, (value) => (passedIndex.value = value))
      }
    }

    // получение props через passedProps со слиянем
    function setParams(
      passedProps: ModelRef<Props>,
      passedModel: ModelRef<any>,
      passedIndex: ModelRef<undefined | string | number>
    ): void {
      props.value = $merge(props.value, passedProps.value)

      if (passedProps.value)
        watch(passedProps, (value) => (props.value = $merge(props.value, value)), { deep: true })

      // заполняю переданные параметры со старта
      if (passedModel.value !== undefined) model.value = passedModel.value
      if (passedIndex.value !== undefined) model.value = props.value.wrapper.list[passedIndex.value]
    }

    // главный текст
    function getText(): string {
      if (model.value && !props.value.multiple)
        return render(index.value ? props.value.wrapper.list?.[index.value] : model.value)

      return props.value.wrapper.text || useSettingsStore().lang?.other?.select
    }

    // получает текст, который нужно отобразить
    function render(li: any): string {
      return String(props.value.wrapper.render ? li[props.value.wrapper.render] : li)
    }

    // проверить строку на сходство с поиском
    function isVisible(text: string): boolean {
      const pattern = new RegExp(search.value, props.value.wrapper.flags)
      return pattern.test(text)
    }

    function clearModel(): void {
      if (!props.value.multiple) {
        const old = model.value
        model.value = undefined
        index.value = undefined

        if (old) props.value.active = false
      }
    }

    function selectItem(li: any, i: string | number): void {
      model.value = li
      index.value = i

      if (!props.value.wrapper.list) return

      if (!props.value.multiple) props.value.active = false
      else {
        // если выбронное кол-во элементов равно кол-ву элементов в списке, то закрыть селект
        const length = Array.isArray(props.value.wrapper.list)
          ? props.value.wrapper.list.length
          : Object.keys(props.value.wrapper.list).length

        if (model.value?.length === length) props.value.active = false
      }
    }

    function isSelected(li: any, i: number | string): boolean {
      if (index.value) return i == index.value
      else return JSON.stringify(li) === JSON.stringify(model.value)
    }

    return {
      props,
      search,
      model,
      index,
      text,
      setParams,
      setWatchers,
      render,
      isVisible,
      clearModel,
      selectItem,
      isSelected
    }
  })
