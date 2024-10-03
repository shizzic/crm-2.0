<script setup lang="ts">
import { useId, useTemplateRef } from 'vue'
import type { Props, Model } from './'
import { useStore } from './store'

const $id = String(useId())
const $store = useStore($id)()
const passedProps = defineModel<Props>('props')
const passedModel = defineModel<Model>('model', { default: FileList })
$store.setWatchers(passedModel)
$store.setParams(passedProps, passedModel)
const element = useTemplateRef('element')

defineExpose({ element, $store })
</script>

<template>
    <input type="file" v-bind="$store?.props?.attributes" ref="element">
</template>