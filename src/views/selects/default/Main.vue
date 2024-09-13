<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useSettingsStore } from '@stores'
import { $merge } from '@/assets/composables'
import type { Props } from './'
import { DefaultCSS } from './'
import type { CSS } from '@types'
import Wrapper from './components/Wrapper.vue'
import { emitter as cancel } from '@/views/other/cancel'

const lang = useSettingsStore().lang
const model: any = defineModel()
const props = withDefaults(defineProps<Props>(), {
    label: true,
    labelText: '',
    css: () => { return {} }
})
const css: Ref<CSS> = ref($merge(DefaultCSS, props.css))
const text: Ref<string> = ref(props.work.text ? props.work.text : lang?.other?.select)
const active: Ref<boolean> = ref(false)
cancel.on('close_select', () => active.value = false)
</script>

<template>
    <div>
        <select v-model="model" :name="props.name" :form="props.form" :required="props.required"
            :multiple="props.multiple" :disabled="props.disabled" :autofocus="props.autofocus" />
        <div data-default :data-default-active="active" v-text="text" @click.stop="active = !active" />

        <KeepAlive>
            <Wrapper v-show="active" v-bind="props" />
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
    cursor: v-bind('css.default.cursor');
    text-align: v-bind('css.default.textAlign');
    width: v-bind('css.default.width');
    color: v-bind('css.default.color');
    font-family: v-bind('css.default.fontFamily');
    font-weight: v-bind('css.default.fontWeight');
    font-size: v-bind('css.default.fontSize');
    border: v-bind('css.default.border');
    border-color: v-bind('css.default.borderColor');
    border-radius: v-bind('css.default.borderRadius');
    background-color: v-bind('css.default.backgroundColor');

    padding: v-bind('css.default.padding');

    transition: border-bottom-left-radius .1s ease-out, border-bottom-right-radius .1s ease-out;
}

[data-default]:hover {
    background-color: v-bind('css.hover.backgroundColor');
}

[data-default-active="true"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
</style>