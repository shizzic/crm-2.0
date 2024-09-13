<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { DefaultCSS } from '..'
import type { Props } from '..'
import type { CSS } from '@types'
import { $merge } from '@/assets/composables'

const props = withDefaults(defineProps<Props>(), {
    label: true,
    labelText: '',
    css: () => { return {} }
})
const css: Ref<CSS> = ref($merge(DefaultCSS, props.css))
const render: (li: any) => any = (li: any) => {
    return props.work.render ? li[props.work.render] : li
}
</script>

<template>
    <ul>
        <li v-for="(li, index) in props.work.list" :key="li.id ? li.id : index" v-html="render(li)" />
    </ul>
</template>