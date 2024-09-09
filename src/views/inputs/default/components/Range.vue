<script setup lang="ts">
import { computed } from 'vue'
import type { Props } from '../'

const model: any = defineModel()
const props = defineProps<Props>()
const isMinimum = computed(() => props.minlength && model?.value?.length < props.minlength)
const isMaximum = computed(() => props.maxlength && (!props.minlength || props.minlength && props.minlength <= model?.value?.length) && model?.value?.length <= props.maxlength)
</script>

<template>
    <span>
        <label v-if="isMinimum" :for="props.id" style="color: #4D5DFA;">
            {{ model?.length }}/{{ props.minlength }}
        </label>
        <label v-if="isMaximum" :for="props.id" style="color: #4D5DFA;">
            {{ model?.length }}/{{ props.maxlength }}
        </label>
    </span>
</template>