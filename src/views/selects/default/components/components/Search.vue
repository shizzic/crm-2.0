<script setup lang="ts">
import { inject, computed } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import Input from '@views/inputs/default/Main.vue'
import type { Props } from '@views/inputs/default'
import type { CSS, StoreID } from '@types'

const $store = useStore(inject('$id') as StoreID)()
const lang = useSettingsStore().lang
const css: CSS = {
    default: {
        color: '#s676767',
        fontFamily: $store.props.css?.default.fontFamily,
        fontWeight: 500,
        backgroundColor: '#fff',
        fontSize: $store.props.css?.default.fontSize,
        padding: '9rem 21rem 9rem 45rem',
    },
    placeholder: {
        color: '#676767',
    }
}
let props: Props = {
    type: 'search',
    name: $store.props.name || 'search',
    placeholder: computed(() => lang?.other?.search).value,
    autocomplete: 'off',
    autocorrect: 'off',
    autofocus: true,

    css: css,
    icon: {
        url: '/lib/search.webp',
    }
}
</script>

<template>
    <Input v-model:props="props" v-model:model="$store.search" class="item" data-search />
</template>

<style scoped>
[data-search] {
    padding: 0 20rem;
    margin: 15rem 0 15rem;
}
</style>