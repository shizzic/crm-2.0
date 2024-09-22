<script setup lang="ts">
import { watch, useTemplateRef, computed, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore } from '@stores'
import Select from '@views/selects/default/Main.vue'
import type { Props } from '@/views/selects/default'

const model: any = ref(useSettingsStore().lang?.settings?.lang?.list[useSettingsStore().locale])
const props: ComputedRef<Props> = computed(() => {
    return {
        hideClear: true,
        wrapper: {
            list: computed(() => (useSettingsStore().lang?.settings?.lang?.list)).value,
            text: computed(() => (useSettingsStore().lang?.settings?.lang?.title)).value
        },
        css: {
            default: {
                width: '80%',
                fontSize: '16rem',
                fotnWeight: 600,
                minWidth: '250px',
                maxWidth: '350px'
            },

            wrapper: {
                position: 'absolute',
            }
        }
    }
})
const select = useTemplateRef('select')
watch(() => select.value?.$store.index, (value) => {
    useSettingsStore().locale = String(value)
})
</script>

<template>
    <Select v-model:props="props" v-model:model="model" v-model:index="useSettingsStore().locale" ref="select" />
</template>