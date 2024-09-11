<script setup lang="ts">
import type { Props } from '..'
import { useSettingsStore } from '@stores'

const lang = useSettingsStore().lang
const props = defineProps<Props>()
</script>

<template>
    <span>
        <label v-if="props.minlength || props.maxlength" :for="props.id">|</label>

        <template v-for="(error, index) in props.v" :key="error">
            <label :for="props.id" style="color: #FF3429;">{{ lang?.validation[error] }}</label>
            <label v-if="index !== (props.v.length - 1)" :for="props.id">|</label>
        </template>

        <label v-if="props.v.length === 0" :for="props.id" style="color: #34C759;">{{ lang?.validation?.valid }}</label>
    </span>
</template>

<style scoped>
label {
    font-weight: 500;

    display: inline-block;
    margin-top: 5px;
    margin-right: 10px;
}
</style>