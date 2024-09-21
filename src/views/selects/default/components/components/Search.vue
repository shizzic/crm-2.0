<script setup lang="ts">
import { inject } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from '../../store'
import Input from '@views/inputs/default/Main.vue'

const $store = useStore(inject('$id') as string)()
const lang = useSettingsStore().lang
const input_css = {
    default: {
        fontSize: '19.75rem',
        padding: '9px 21px 9px 45px',
    }
}
let searchProps = {
    name: $store.props.name,
    placeholder: lang?.other?.search,
    autocomplete: 'off',
    autocorrect: 'off',
    autofocus: true,

    css: input_css,
    icon: 'src/assets/images/lib/search.webp'
}
</script>

<template>
    <Input v-model:model="$store.search" ref="search" v-model:props="searchProps" class="item" data-search />
</template>

<style scoped>
[data-search] {
    padding: 0 20px;
    margin: 15px 0 15px;
}
</style>