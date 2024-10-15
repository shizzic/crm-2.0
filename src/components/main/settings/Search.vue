<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { Props } from '@views/inputs/default'
import { useSettingsStore } from '@stores'
import Input from '@views/inputs/default/Main.vue'
import { useStore } from './store'

const props: ComputedRef<Props> = computed(() => {
    return {
        type: 'search',
        name: 'search',
        autocomplete: 'on',
        placeholder: ref(useSettingsStore().lang?.other?.search).value,
        icon: {
            url: '/lib/search.webp',
            size: '17rem 45%',
            filter: '#4D5DFA',
        },
        css: {
            default: {
                border: 'none',
                padding: '10rem 21rem 10rem 45rem'
            }
        }
    }
})
</script>

<template>
    <Input v-model:props="props" v-model:model="useStore().search" style="margin-right: 20rem;" />
</template>