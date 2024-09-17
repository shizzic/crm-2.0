<script setup lang="ts">
import { ref, useTemplateRef, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import Select from '@views/selects/default/Main.vue'
import { fetcher } from '@/assets/composables/fetcher'
import { useProjectStore, useSettingsStore } from '@stores'

const lang = useSettingsStore().lang
const list: Ref<undefined | null | any[] | {}> = ref(undefined)
const text = lang.table.projects
const select: any = useTemplateRef('select')
const model: any = {
    name: 'projects',
    wrapper: { list, text, description: text },
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
}

fetcher.get('project/project-user/attached-projects')
    .then((res: any) => list.value = res?.data)
watch(() => select?.value?.model, (data: any) => {
    useProjectStore().id = data?.id
    useProjectStore().title = data?.title
})
onMounted(() => {
    if (useProjectStore().id && useProjectStore().title)
        select.value.model = { id: useProjectStore().id, title: useProjectStore().title }
})
</script>

<template>
    <Select v-model="model" ref="select" />
</template>