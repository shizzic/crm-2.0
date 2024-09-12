<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import Select from '@views/selects/default/Main.vue'
import { fetcher } from '@/assets/composables/fetcher'

const list: Ref<undefined | null | any[] | {}> = ref(undefined)
const render: string = 'title'
fetcher.get('project/project-user/attached-projects')
    .then((res: any) => list.value = res?.data)
</script>

<template>
    <Select v-bind="{
        name: 'projects',
        work: { list, render },
        css: {
            default: {
                color: '#ffffff',
                fontSize: '22rem',
                fontWeight: '600',
                border: 'none',
                backgroundColor: '#4D5DFA',
                borderRadius: '20px',
                padding: '15px 20px',
                textAlign: 'center'
            },
            hover: {
                backgroundColor: '#3045ff'
            }
        }
    }" />
</template>