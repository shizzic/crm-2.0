<script setup lang="ts">
import { useSettingsStore } from '@stores'
import { ref } from 'vue'
import { $merge } from '@composables'
import type { Props } from '.'
import { DefaultCSS, emitter } from '.'
import type { Ref } from 'vue'
import type { CSS } from '@types'

const lang = useSettingsStore().lang
const props = withDefaults(defineProps<Props>(), {
    css: () => { return {} }
})
const text: Ref<string> = ref(props.text ? props.text : lang?.other?.cancel)
const css: Ref<CSS> = ref($merge(DefaultCSS, props.css))
</script>

<template>
    <button @click.prevent="emitter.emit(props.event)" v-text="text" />
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