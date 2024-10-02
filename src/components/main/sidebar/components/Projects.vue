<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import Select from '@views/selects/default/Main.vue'
import { fetcher } from '@/assets/composables/fetcher'
import { useProjectStore, useSettingsStore } from '@stores'
import type { List, CSS } from '@types'
import type { Props } from '@views/selects/default'

const list: Ref<List> = ref(useProjectStore().list)
const text: ComputedRef<string> = computed(() => (useSettingsStore().lang?.table?.projects))
const description: ComputedRef<string> = computed(() => (useSettingsStore().lang?.sidebar?.selects?.projects?.description))
const css: CSS = {
    default: {
        color: '#ffffff',
        fontSize: '22rem',
        fontWeight: '600',
        border: 'none',
        backgroundColor: '#4D5DFA',
        borderRadius: '20px',
        padding: '20px 20px',
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
        useProjectStore().list = list.value

        if (!useProjectStore().id && list.value?.[0]) {
            useProjectStore().id = list.value[0].id
            useProjectStore().title = list.value[0].title
            initModel()
        }
    })

const model: Ref<any> = ref(null)
watch(model, (data) => {
    useProjectStore().id = data?.id
    useProjectStore().title = data?.title
})

const initModel = (): void => {
    if (useProjectStore().id && useProjectStore().title)
        model.value = { id: +String(useProjectStore().id), title: String(useProjectStore().title) }
}

initModel()
</script>

<template>
    <div data-parent>
        <Select v-model:props="props" v-model:model="model" />
    </div>
</template>

<style scoped>
[data-parent] {
    width: 100%;

    padding: 20px 20px 0;
}
</style>