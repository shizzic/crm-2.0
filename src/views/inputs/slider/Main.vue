<script setup lang="ts">
import { useId } from "vue"
import type { Props, Model } from "."
import { useStore } from "./store"
import { defaultProps } from "."
import VueSlider from "vue-3-slider-component"

const $id = String(useId())
const $store = useStore($id)()
const passedProps = defineModel<Props>('props', { default: defaultProps })
const passedModel = defineModel<Model>('model', { default: 0 })
$store.setWatchers(passedModel)
$store.setParams(passedProps, passedModel)
</script>

<template>
    <div data-root>
        <h6 v-if="$store.props.label" v-html="$store.props.labelText" />
        <VueSlider v-model="$store.model" v-bind="$store.props" />
    </div>
</template>

<style scoped>
[data-root] {
    width: v-bind('$store.props.css?.default.width');

    padding: v-bind('$store.props.css?.default.padding');
    margin: v-bind('$store.props.css?.default.margin');
}
</style>