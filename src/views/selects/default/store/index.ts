import { defineStore } from 'pinia'
import { set } from '@stores/reusable/funcs'
import { ref, computed, watch } from 'vue'
import type { Ref, ModelRef } from 'vue'
import type { InputModel } from '@views/inputs/default'
import { useSettingsStore } from '@stores'
import { defaultProps } from '..'
import type { Props } from '..'
import { $merge } from '@assets/composables'
import { emitter as cancel } from '@/views/lib/cancel'

export const useStore = (id: string | number) =>
  defineStore(`select/${id}`, () => {
    const props: Ref<Props> = ref(defaultProps)
    const search: InputModel = ref('')
    const model: Ref<any> = ref(undefined) // value
    const text = computed(() => getText()) // главный текст селекта

    // получение props через passedProps со слиянем вместе с дефолтными + отслеживание изменений
    function setProps(passedProps: ModelRef<Props>): void {
      props.value = $merge(props.value, passedProps.value)
      watch(passedProps, (value) => (props.value = $merge(props.value, value)), { deep: true })
    }

    // главный текст
    function getText(): string {
      if (model.value && !props.value.multiple) return render(model.value)
      return props.value.wrapper.text
        ? props.value.wrapper.text
        : useSettingsStore().lang?.other?.select
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

        if (old) cancel.emit('close_select')
      }
    }

    function selectItem(li: any): void {
      model.value = li
      if (!props.value.wrapper.list) return

      if (!props.value.multiple) cancel.emit('close_select')
      else {
        const length = Array.isArray(props.value.wrapper.list)
          ? props.value.wrapper.list.length
          : Object.keys(props.value.wrapper.list).length

        if (model.value?.length === length) cancel.emit('close_select')
      }
    }

    function isSelected(li: any): boolean {
      if (model.value) {
        const str = JSON.stringify(li)

        if (props.value.multiple)
          for (const key in model.value) if (str === JSON.stringify(model.value?.[key])) return true

        if (str === JSON.stringify(model.value)) return true
      }

      return false
    }

    return {
      props,
      search,
      model,
      text,
      setProps,
      render,
      isVisible,
      clearModel,
      selectItem,
      isSelected,
      set
    }
  })
