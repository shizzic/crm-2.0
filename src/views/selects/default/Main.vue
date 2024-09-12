<script setup lang="ts">
import { ref } from 'vue'
import { $merge } from '@/assets/composables'
import type { Props } from './'
import { DefaultCSS } from './'
import { useSettingsStore } from '@/stores';

const model: any = defineModel()
const props = withDefaults(defineProps<Props>(), {
    label: true,
    labelText: '',
    css: () => { return {} }
})
const css = ref($merge(DefaultCSS, props.css))
const text = ref(props.work.text ? props.work.text : useSettingsStore().lang?.table?.projects)
const render = (li: any) => {
    return props.work.render ? li[props.work.render] : li
}
</script>

<template>
    <div data-select>
        <select v-model="model" :name="props.name" :form="props.form" :required="props.required"
            :multiple="props.multiple" :disabled="props.disabled" :autofocus="props.autofocus" />
        <div data-default v-text="text" />
        <ul>
            <li v-for="(li, index) in props.work.list" :key="li.id ? li.id : index" v-html="render(li)" />
        </ul>
    </div>
</template>

<style scoped>
[data-select] {
    position: relative;
}

select {
    height: 0;
    width: 0;

    position: absolute;
    right: 0;
    top: 0;
}

[data-default] {
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
}

[data-default]:hover {
    background-color: v-bind('css.hover.backgroundColor');
}
</style>