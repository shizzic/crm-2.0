<script setup lang="ts">
import { ref, watch, computed } from "vue"
import { useSettingsStore } from "@stores"
import Slider from '@views/inputs/slider/Main.vue'

const model = ref(+useSettingsStore().size.slice(0, -2))
const props = computed(() => {
    return {
        interval: 0.01,
        min: 0.8,
        max: 1.2,
        lazy: false,
        tooltip: 'none',
        silent: true
    }
})

watch(model, (value) => useSettingsStore().size = `${value}px`)
</script>

<template>
    <Slider v-model:props="props" v-model:model="model" />
</template>

<style scoped></style>