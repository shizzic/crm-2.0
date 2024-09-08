<script setup lang="ts">
import { inject } from 'vue'
import type { Props } from '..'
import { Lang_provide } from '@symbols'

const lang = inject(Lang_provide)
const props = defineProps<Props>()
</script>

<template>
    <span>
        <label v-for="error in props.v" :key="error" :for="props.id">
            {{ lang?.validation[error] }}
        </label>

        <label v-if="props.v.length === 0" :for="props.id">{{ lang?.validation?.valid }}</label>
    </span>
</template>