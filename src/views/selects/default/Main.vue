<script setup lang="ts">
import { $merge } from '@assets/funcs'
import type { Props } from './'
import { DefaultCSS } from './'

const model: any = defineModel()
const props = withDefaults(defineProps<Props>(), {
    required: true,

    label: true,
    labelText: '',
    css: () => { return {} }
})
const css = $merge(DefaultCSS, props.css)
</script>

<template>
    <div>
        {{ model }}
        <select v-model="model" :name="props.name" :form="props.form" :required="props.required"
            :multiple="props.multiple" :disabled="props.disabled" :autofocus="props.autofocus" />

        <!-- <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul> -->
    </div>
</template>

<style>
ul {
    width: v-bind('css.ul.default.width');
    color: v-bind('css.ul.default.color');
    font-family: v-bind('css.ul.default.fontFamily');
    font-weight: v-bind('css.ul.default.fontWeight');
    font-size: v-bind('css.ul.default.fontSize');
    border: v-bind('css.ul.default.border');
    border-color: v-bind('css.ul.default.borderColor');
    border-radius: v-bind('css.ul.default.borderRadius');
    background-color: v-bind('css.ul.default.backgroundColor');

    padding: v-bind('css.ul.default.padding');
}
</style>