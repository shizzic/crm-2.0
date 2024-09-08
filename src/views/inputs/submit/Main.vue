<script setup lang="ts">
import type { Merge } from '@types'
import { Merge_provide } from '@symbols'
import { inject, ref } from 'vue'
import type { Props } from './'
import { DefaultCSS } from './'

const $merge = inject(Merge_provide) as Merge
const props = withDefaults(defineProps<Props>(), {
    css: () => { return {} }
})
const css = ref($merge(DefaultCSS, props.css))
</script>

<template>
    <input type="submit" :value="props.text">
</template>

<style scoped>
input {
    cursor: v-bind('css.default.cursor');
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
    margin: v-bind('css.default.margin');
}

input:hover {
    background-color: v-bind('css.hover.backgroundColor');
}
</style>