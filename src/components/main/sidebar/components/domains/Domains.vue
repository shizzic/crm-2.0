<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import Select from '@views/selects/default/Main.vue'
import { fetcher } from '@/assets/composables/fetcher'
import { useProjectStore, useSettingsStore, useDomainStore } from '@stores'
import type { List, CSS } from '@types'
import type { Props } from '@views/selects/default'

const list: Ref<List> = ref(useDomainStore().list)
const text: ComputedRef<string> = computed(() => useSettingsStore().lang.table.domains)
const description: ComputedRef<string> = computed(() => useSettingsStore().lang.sidebar.selects?.domains?.description)
const css: CSS = {
    default: {
        color: '#ffffff',
        fontSize: '22rem',
        fontWeight: '600',
        border: 'none',
        backgroundColor: '#3F3F57',
        borderRadius: '20px',
        padding: '20px 20px',
        textAlign: 'center'
    },
    hover: {
        backgroundColor: '#23233E'
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

fetcher.get('domain')
    .then((r: any) => {
        list.value = r?.data?.data
        useDomainStore().list = list.value

        if (list.value) {
            if (list.value.length > 0 && !useDomainStore().id)
                for (let item of list.value) {
                    useDomainStore().title = item.title
                    useDomainStore().id = item.id
                    initModel()
                    break
                }
        }
    })
const model: Ref<any> = ref(null)
watch(model, (data: any, old: any) => {
    if (old) {
        useProjectStore().$reset()
        useDomainStore().title = data?.title
        useDomainStore().id = data?.id
    }
})

const initModel = (): void => {
    if (useDomainStore().id && useDomainStore().title)
        model.value = { id: useDomainStore().id, title: useDomainStore().title }
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
    padding: 0 20px 0;
}
</style>