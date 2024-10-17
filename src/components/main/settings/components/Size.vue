<script setup lang="ts">
import { ref, watch, computed } from "vue"
import { useSettingsStore } from "@stores"
import Slider from '@views/inputs/slider/Main.vue'

const size = computed(() => Number(useSettingsStore().size.slice(0, -2)))
const model = ref(size.value)
let props = {
    interval: 0.01,
    min: 0.7,
    max: 1.1,
    lazy: false,
    tooltip: 'none',
    silent: true
}

watch(model, (value) => { if (value !== undefined) useSettingsStore().size = `${value || 1}px` })
watch(size, (value) => { if (value !== undefined) model.value = value })
</script>

<template>
    <Slider v-model:props="props" v-model:model="model" />
</template>

<style scoped></style>