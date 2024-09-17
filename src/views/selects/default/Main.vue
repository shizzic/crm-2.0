<script setup lang="ts">
import { ref, provide, watch, computed } from 'vue'
import type { Ref } from 'vue'
import { useSettingsStore } from '@stores'
import { $merge } from '@/assets/composables'
import type { Props } from './'
import { defaultProps } from './'
import Wrapper from './components/Wrapper.vue'
import { emitter as cancel } from '@/views/other/cancel'

const lang = useSettingsStore().lang
const passedProps = defineModel<Props>({ required: true })
const props: Ref<Props> = ref(passedProps.value)
const model: Ref<any> = ref(undefined)
props.value = $merge(defaultProps, passedProps.value)
const render = (li: any) => props.value.wrapper.render ? li[props.value.wrapper.render] : li
const text: Ref<string> = computed(() => {
    if (model.value && !props.value.multiple)
        return render(model.value)

    return props.value.wrapper.text ? props.value.wrapper.text : lang?.other?.select
})

watch(passedProps, (value) => props.value = $merge(props.value, value), { deep: true })
cancel.on('close_select', () => props.value.active = false)
provide('$props', props)
provide('$model', model)
provide('$render', render)
defineExpose({ model })
</script>

<template>
    <div>
        <select :name="props.name" :form="props.form" :required="props.required" :multiple="props.multiple"
            :disabled="props.disabled" :autofocus="props.autofocus" v-model="model" />
        <div data-default :data-default-active="props.active" v-text="text"
            @click.stop="props.active = !props.active" />

        <KeepAlive>
            <Wrapper v-if="props.active" />
        </KeepAlive>
    </div>
</template>

<style scoped>
select {
    height: 0;
    width: 0;

    position: absolute;
    right: 0;
    top: 0;
}

[data-default] {
    position: relative;
    z-index: 2;
    line-height: 1;
    cursor: v-bind('props.css?.default.cursor');
    text-align: v-bind('props.css?.default.textAlign');
    width: v-bind('props.css?.default.width');
    color: v-bind('props.css?.default.color');
    font-family: v-bind('props.css?.default.fontFamily');
    font-weight: v-bind('props.css?.default.fontWeight');
    font-size: v-bind('props.css?.default.fontSize');
    border: v-bind('props.css?.default.border');
    border-color: v-bind('props.css?.default.borderColor');
    border-radius: v-bind('props.css?.default.borderRadius');
    background-color: v-bind('props.css?.default.backgroundColor');

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    padding: v-bind('props.css?.default.padding');
    transition: border-bottom-left-radius .15s ease-out, border-bottom-right-radius .1s ease-out;
}

[data-default]:hover {
    background-color: v-bind('props.css?.hover.backgroundColor');
}

[data-default-active="true"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
</style>