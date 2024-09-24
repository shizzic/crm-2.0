<script setup lang="ts">
import { useId } from "vue"
import type { Props, Model } from "."
import { useStore } from "./store"
import VueSlider from "vue-3-slider-component"

const $id = String(useId())
const $store = useStore($id)()
const passedProps = defineModel<Props>('props')
const passedModel = defineModel<Model>('model', { default: 0 })
$store.setWatchers(passedModel)
$store.setParams(passedProps, passedModel)
</script>

<template>
    <VueSlider v-model="$store.model" v-bind="$store.props" />
</template>

<style scoped></style>