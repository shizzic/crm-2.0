<script setup lang="ts">
import { useSettingsStore } from '@stores'
import Input from '@views/inputs/default/Main.vue'
import { useStore } from './store'

let props = {
    placeholder: useSettingsStore().lang?.other?.search,
    icon: {
        url: '/lib/search.webp',
        size: '17px 45%',
        filter: '#4D5DFA',
    },
    css: {
        default: {
            border: 'none',
            backgroundColor: '#F2F4F6',
            padding: '10px 21px 10px 45px'
        }
    }
}
</script>

<template>
    <Input v-model:props="props" v-model:model="useStore().search" style="margin-right: 20px;" />
</template>