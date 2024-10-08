<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore } from '@stores'
import Radio from '@views/inputs/radio/Main.vue'
import type { Props } from '@views/inputs/radio'

const index = ref(useSettingsStore().theme)
let props: ComputedRef<Props> = computed(() => {
    return {
        list: useSettingsStore().lang?.settings?.theme?.list,
        deep: ['title']
    }
})

watch(index, (value) => { if (value) useSettingsStore().theme = value })
</script>

<template>
    <Radio v-model:props="props" v-model:index="index" />
</template>