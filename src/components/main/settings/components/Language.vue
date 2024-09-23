<script setup lang="ts">
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore } from '@stores'
import Select from '@views/selects/default/Main.vue'
import type { Props } from '@/views/selects/default'

const props: ComputedRef<Props> = computed(() => {
    return {
        name: 'language',
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
</script>

<template>
    <Select v-model:props="props" v-model:index="useSettingsStore().locale" />
</template>