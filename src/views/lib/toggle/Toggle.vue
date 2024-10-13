<script setup lang="ts">
import { useId } from "vue"
import { useStore } from "./store"
import { defaultProps } from "."
import type { Props, Model } from "."
import Toggle from "@vueform/toggle"
import "@vueform/toggle/themes/default.css"

const $id = String(useId())
const $store = useStore($id)()
const passedProps = defineModel<Props>('props', { default: defaultProps })
const passedModel = defineModel<Model>('model', { default: false })
$store.setWatchers(passedModel)
$store.setParams(passedProps, passedModel)
</script>

<template>
    <Toggle :value="$store.model" v-bind="$store.props.attributes" data-toggle />
</template>

<style scoped>
[data-toggle] {
    border: none;
    box-shadow: none;
    --toggle-width: v-bind('$store.props.css?.default.width');
    --toggle-height: v-bind('$store.props.css?.default.height');
    --toggle-border: v-bind('$store.props.css?.default.borderWidth');
    --toggle-bg-off: v-bind('$store.props.css?.default.bgOff');
    --toggle-bg-on: v-bind('$store.props.css?.default.bgOn');
    --toggle-border-off: v-bind('$store.props.css?.default.bgOff');
    --toggle-border-on: v-bind('$store.props.css?.default.bgOn');
}
</style>