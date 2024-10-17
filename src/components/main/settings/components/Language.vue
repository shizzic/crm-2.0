<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { useSettingsStore } from '@stores'
import Select from '@views/selects/default/Main.vue'
import type { Props } from '@/views/selects/default'
import type { Locale } from '@stores/settings/lang'

const index = ref(useSettingsStore().locale)
const list: { [index in Locale]: { title: string } } = {
    RU: { title: 'Русский' },
    EN: { title: 'English' }
}
const props: ComputedRef<Props> = computed(() => {
    return {
        name: 'language',
        hideClear: true,
        wrapper: {
            list: list,
            text: computed(() => (useSettingsStore().lang?.settings?.lang?.title)).value
        },
        css: {
            default: {
                width: '80%',
                fontSize: '16rem',
                fotnWeight: 600,
                minWidth: '0',
                maxWidth: '350rem',
                backgroundColor: 'var(--color-1)'
            },

            wrapper: {
                position: 'absolute',
            }
        }
    }
})

watch(index, (value) => {
    if (value !== undefined) {
        useSettingsStore().locale = value

        document.title =
            String(
                useSettingsStore().lang?.components?.settings ??
                window.location.hostname.split('.').shift()
            ) + ' | isinda'
    }
})
watch(() => useSettingsStore().locale, (value) => { if (value !== undefined) index.value = value })
</script>

<template>
    <Select v-model:props="props" v-model:index="index" />
</template>