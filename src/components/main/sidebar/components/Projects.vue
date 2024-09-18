<script setup lang="ts">
import { ref, useTemplateRef, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import Select from '@views/selects/default/Main.vue'
import { fetcher } from '@/assets/composables/fetcher'
import { useProjectStore, useSettingsStore } from '@stores'

const lang = useSettingsStore().lang
const list: Ref<undefined | null | any[]> = ref(useProjectStore().list)
const text: string = lang.table.projects
const description: string = lang.sidebar.selects?.projects?.description
const select: any = useTemplateRef('select')
let model: any = {
    name: 'projects',
    hideClear: true,
    wrapper: { list, text, description },
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
        },
    }
}

fetcher.get('project/project-user/attached-projects')
    .then((r: any) => {
        list.value = r?.data
        useProjectStore().list = r?.data
    })
watch(() => select?.value?.model, (data: any) => {
    useProjectStore().id = data?.id
    useProjectStore().title = data?.title
})
watch(() => useProjectStore().id, (value: undefined | number) => { if (!value) select.value.model = undefined })
onMounted(() => {
    if (useProjectStore().id && useProjectStore().title)
        select.value.model = { id: useProjectStore().id, title: useProjectStore().title }
})
</script>

<template>
    <Select v-model="model" ref="select" />
</template>