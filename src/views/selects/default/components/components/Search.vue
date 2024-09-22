<script setup lang="ts">
import { inject, computed } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import Input from '@views/inputs/default/Main.vue'
import type { Props } from '@views/inputs/default'
import type { CSS } from '@types'

const $store = useStore(inject('$id') as string)()
const lang = useSettingsStore().lang
const css: CSS = {
    default: {
        fontFamily: $store.props.css?.default.fontFamily,
        fontWeight: 500,
        fontSize: $store.props.css?.default.fontSize,
        padding: '9px 21px 9px 45px',
    }
}
let props: Props = {
    name: $store.props.name,
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
    <Input v-model:model="$store.search" v-model:props="props" class="item" data-search />
</template>

<style scoped>
[data-search] {
    padding: 0 20px;
    margin: 15px 0 15px;
}
</style>