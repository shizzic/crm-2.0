<script setup lang="ts">
import type { Model } from '@views/inputs/default'
import type { Props } from '../..'
import { inject } from 'vue'
import type { Ref } from 'vue'
import { useSettingsStore } from '@stores'
import Input from '@views/inputs/default/Main.vue'

const model: Model = defineModel({ default: '' })
const lang = useSettingsStore().lang
const props = inject('$props') as Ref<Props>
const input_css = {
    default: {
        fontSize: '19.75rem',
        padding: '9px 21px 9px 45px',
    }
}
let searchProps = {
    name: props.value.name,
    placeholder: lang?.other?.search,
    autocomplete: 'off',
    autocorrect: 'off',
    autofocus: true,

    css: input_css,
    icon: 'src/assets/images/lib/search.webp'
}
</script>

<template>
    <Input v-model:model="model" ref="search" v-model:props="searchProps" class="item" data-search />
</template>

<style scoped>
[data-search] {
    padding: 0 20px;
    margin: 15px 0 15px;
}
</style>