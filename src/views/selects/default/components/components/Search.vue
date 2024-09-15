<script setup lang="ts">
import { inject } from 'vue'
import { useSettingsStore } from '@stores'
import Input from '@views/inputs/default/Main.vue'

const model = defineModel()
const lang = useSettingsStore().lang
const props: any = inject('$props')
const input_css = {
    default: {
        fontSize: '19.75rem',
        padding: '9px 21px',
    },
}
</script>

<template>
    <Input v-model="model" v-bind="{
        name: props.name,
        placeholder: lang?.other?.search,
        autocomplete: 'on',
        autocorrect: 'off',

        label: false,
        css: input_css,
    }" class="item" style="padding: 0 20px;" />
</template>