<script setup lang="ts">
import { useSettingsStore } from '@stores'
import { $merge } from '@/assets/composables'
import { ref } from 'vue'
import type { Props } from './'
import { DefaultCSS } from './'
import type { Ref } from 'vue'
import type { CSS } from '@/assets/types'

const lang = useSettingsStore().lang
const props = withDefaults(defineProps<Props>(), {
    css: () => { return {} }
})
const text: Ref<string> = ref(props.text || lang?.other?.submit)
const css: Ref<CSS> = ref($merge(DefaultCSS, props.css))
</script>

<template>
    <input type="submit" :value="text">
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