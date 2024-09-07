<script setup lang="ts">
import { inject } from 'vue'
import type { Lang } from '@/assets/types'
import type { Props } from '../ts'
import { Lang_provide } from '@/assets/symbols'

const lang = inject(Lang_provide) as Lang
const props = defineProps<Props>()
</script>

<template>
    <span>
        <span v-if="props.v.length > 0">
            <label v-for="(error, index) in props.v" :key="index" :for="props.id">
                {{ lang.validation[error] }}
            </label>
        </span>

        <label v-else :for="props.id">{{ lang.validation.valid }}</label>
    </span>
</template>