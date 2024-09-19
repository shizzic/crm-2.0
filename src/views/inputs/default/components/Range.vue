<script setup lang="ts">
import { computed } from 'vue'
import type { Props, Model } from '../'

const model: Model = defineModel('model', { default: '' })
const props = defineProps<Props>()
const isMinimum = computed(() => props.minlength && model?.value?.length < props.minlength)
const isMaximum = computed(() => props.maxlength && (!props.minlength || props.minlength && props.minlength <= model?.value?.length) && model?.value?.length <= props.maxlength)
</script>

<template>
    <span>
        <span v-if="isMinimum" data-state style="color: #4D5DFA;" v-text="`${model?.length}/${props.minlength}`" />
        <span v-if="isMaximum" data-state style="color: #4D5DFA;" v-text="`${model?.length}/${props.maxlength}`" />
    </span>
</template>

<style scoped>
[data-state] {
    font-weight: 500;

    display: inline-block;
    margin-top: 5px;
    margin-right: 10px;
}
</style>