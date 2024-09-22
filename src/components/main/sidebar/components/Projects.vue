<script setup lang="ts">
import { ref, useTemplateRef, watch, onMounted, computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import Select from '@views/selects/default/Main.vue'
import { fetcher } from '@/assets/composables/fetcher'
import { useProjectStore, useSettingsStore } from '@stores'
import type { List, CSS } from '@types'
import type { Props } from '@views/selects/default'

const list: Ref<List> = ref(useProjectStore().list)
const text: ComputedRef<string> = computed(() => (useSettingsStore().lang?.table?.projects))
const description: ComputedRef<string> = computed(() => (useSettingsStore().lang?.sidebar?.selects?.projects?.description))
const select: any = useTemplateRef('select')
const css: CSS = {
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
const props: ComputedRef<Props> = computed(() => {
    return {
        name: 'projects',
        arrow: false,
        hideClear: true,
        wrapper: { list: list.value, text: text.value, description: description.value },
        css: css
    }
})
fetcher.get('project/project-user/attached-projects')
    .then((r: any) => {
        list.value = r?.data
        useProjectStore().list = r?.data
    })
watch(() => select?.value?.$store.model, (data: any) => {
    useProjectStore().id = data?.id
    useProjectStore().title = data?.title
})
watch(() => useProjectStore().id, (value: undefined | number) => { if (!value && select?.value?.$store.model) select.value.$store.model = undefined })
onMounted(() => {
    if (useProjectStore().id && useProjectStore().title)
        select.value.$store.model = { id: useProjectStore().id, title: useProjectStore().title }
})
</script>

<template>
    <div data-parent>
        <Select v-model:props="props" v-bind="props" ref="select" />
    </div>
</template>

<style scoped>
[data-parent] {
    width: 100%;

    padding: 0 20px 0;
}
</style>