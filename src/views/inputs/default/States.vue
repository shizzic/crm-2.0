<script setup lang="ts">
import { inject } from 'vue'
import type { Props } from './ts'
import type { Lang } from '@/assets/types'
import { Lang_provide } from '@/assets/symbols'

const lang = inject(Lang_provide) as Lang
const model: any = defineModel()
const props = defineProps<Props>()
</script>

<template>
    <p>
        <label v-if="props.minlength && model?.length !== 0 && model?.length < props.minlength" :for="props.id">
            {{ model?.length }}/{{ props.minlength }}
        </label>
        <label
            v-if="props.maxlength && (!props.minlength || props.minlength && props?.minlength <= model?.length) && model?.length < props.maxlength"
            :for="props.id">
            {{ model?.length }}/{{ props.maxlength }}
        </label>

        <span v-memo="props.v">
            <label v-for="error in props.v" :key="error" :for="props.id">
                {{ lang.validation[error] }}
            </label>

            <label v-if="props.v.length === 0" :for="props.id">{{ lang.validation.valid }}</label>
        </span>
    </p>
</template>

<style scoped>
p {
    margin-left: 22px;
}

label {
    font-family: Metropolis, sans-serif;
    font-weight: Medium;
    font-size: 13px;

    display: inline-block;
    margin-top: 5px;
}

label:not(:last-child) {
    margin-right: 10px;
}
</style>