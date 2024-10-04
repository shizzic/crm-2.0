<script setup lang="ts">
import { useId, useTemplateRef } from 'vue'
import type { Props, Model } from './'
import { useStore } from './store'

const $id = String(useId())
const $store = useStore($id)()
const passedProps = defineModel<Props>('props')
const passedModel = defineModel<Model>('model', { default: new DataTransfer().files })
$store.setWatchers(passedModel)
$store.setParams(passedProps, passedModel)
const element = useTemplateRef('element')

defineExpose({ element, $store })
const changeHandler = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement
    $store.model = target.files!
}
</script>

<template>
    <input type="file" v-bind="$store?.props?.attributes" ref="element" @change="changeHandler">
</template>