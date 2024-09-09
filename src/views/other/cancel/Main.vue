<script setup lang="ts">
import { ref } from 'vue'
import { $merge } from '@assets/funcs'
import { useSettingsStore } from '@stores'
import type { Props } from '.'
import { DefaultCSS } from '.'
import { events } from '.'

let props = withDefaults(defineProps<Props>(), {
    css: () => { return {} }
})
const text = ref(props.text ? props.text : useSettingsStore().lang.other?.cancel)
const css = $merge(DefaultCSS, props.css)
</script>

<template>
    <button @click.prevent="events.emit(props.event)" v-text="text" />
</template>

<style scoped>
button {
    cursor: v-bind('css.default.cursor');
    width: v-bind('css.default.width');
    color: v-bind('css.default.color');
    font-family: v-bind('css.default.fontFamily');
    font-weight: v-bind('css.default.fontWeight');
    font-size: v-bind('css.default.fontSize');
    border: v-bind('css.default.border');
    border-radius: v-bind('css.default.borderRadius');
    background-color: v-bind('css.default.backgroundColor');

    padding: v-bind('css.default.padding');
}

button:hover {
    background-color: v-bind('css.hover.backgroundColor');
}
</style>