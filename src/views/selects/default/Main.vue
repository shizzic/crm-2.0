<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { Ref } from 'vue'
import { useSettingsStore } from '@stores'
import { $merge } from '@/assets/composables'
import type { Props } from './'
import { defaultProps } from './'
import Wrapper from './components/Wrapper.vue'
import { emitter as cancel } from '@/views/other/cancel'

const model: any = defineModel()
const lang = useSettingsStore().lang

const version = ref(0)
const passedProps = defineProps<Props>()
const merged = ref($merge(defaultProps, passedProps))
watch(passedProps, () => {
    merged.value = $merge(defaultProps, passedProps)
    ++version.value
})
const props: any = ref(merged)

provide('$props', props)
const text: Ref<string> = ref(props.value.wrapper.text ? props.value.wrapper.text : lang?.other?.select)
cancel.on('close_select', () => active.value = false)
const active = ref(false)
</script>

<template>
    <div>
        {{ props.wrapper.isVisible }}<br>
        {{ props.wrapper.list }}
        <select v-model="model" :name="props.name" :form="props.form" :required="props.required"
            :multiple="props.multiple" :disabled="props.disabled" :autofocus="props.autofocus" />
        <div data-default :data-default-active="active" v-text="text" @click.stop="active = !active" />
        <Wrapper v-show="active" :key="version" />
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
    cursor: v-bind('props?.css?.default.cursor');
    text-align: v-bind('props?.css?.default.textAlign');
    width: v-bind('props?.css?.default.width');
    color: v-bind('props?.css?.default.color');
    font-family: v-bind('props?.css?.default.fontFamily');
    font-weight: v-bind('props?.css?.default.fontWeight');
    font-size: v-bind('props?.css?.default.fontSize');
    border: v-bind('props?.css?.default.border');
    border-color: v-bind('props?.css?.default.borderColor');
    border-radius: v-bind('props?.css?.default.borderRadius');
    background-color: v-bind('props?.css?.default.backgroundColor');

    padding: v-bind('props?.css?.default.padding');

    transition: border-bottom-left-radius .15s ease-out, border-bottom-right-radius .1s ease-out;
}

[data-default]:hover {
    background-color: v-bind('props?.css?.hover.backgroundColor');
}

[data-default-active="true"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
</style>