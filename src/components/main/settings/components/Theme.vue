<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore } from '@stores'
import Radio from '@views/inputs/radio/Main.vue'
import type { Props } from '@views/inputs/radio'

let index = 'light'
let props: ComputedRef<Props> = computed(() => {
    return {
        list: useSettingsStore().lang?.settings?.theme?.list,
        deep: ['title']
    }
})
</script>

<template>
    <Radio v-model:props="props" v-model:index="index" />
</template>