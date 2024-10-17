<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore } from '@stores'
import Radio from '@views/inputs/radio/Main.vue'
import type { Props } from '@views/inputs/radio'

const index = ref(useSettingsStore().linkTarget)
let props: ComputedRef<Props> = computed(() => {
    return {
        list: useSettingsStore().lang?.settings?.linkTo?.list2,
        deep: ['title']
    }
})

watch(index, (value) => { if (value !== undefined) useSettingsStore().linkTarget = value })
watch(() => useSettingsStore().linkTarget, (value) => { if (value !== undefined) index.value = value })
</script>

<template>
    <Radio v-model:props="props" v-model:index="index" />
</template>