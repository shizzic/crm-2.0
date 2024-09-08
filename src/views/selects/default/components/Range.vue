<script setup lang="ts">
import type { Props } from '../'

const model: any = defineModel()
const props = defineProps<Props>()
</script>

<template>
    <span>
        <label v-if="props.minlength && model?.length !== 0 && model?.length < props.minlength" :for="props.id">
            {{ model?.length }}/{{ props.minlength }}
        </label>
        <label
            v-if="props.maxlength && (!props.minlength || props.minlength && props?.minlength <= model?.length) && model?.length < props.maxlength"
            :for="props.id">
            {{ model?.length }}/{{ props.maxlength }}
        </label>
    </span>
</template>