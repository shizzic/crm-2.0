<script setup lang="ts">
import { ref, useTemplateRef, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import Select from '@views/selects/default/Main.vue'
import { fetcher } from '@/assets/composables/fetcher'
import { useProjectStore, useSettingsStore, useDomainStore } from '@stores'
import type { List } from '@types'

const lang = useSettingsStore().lang
const list: Ref<List> = ref(useDomainStore().list)
const text: string = lang.table.domains
const description: string = lang.sidebar.selects?.domains?.description
const select: any = useTemplateRef('select')
let props: any = {
    name: 'projects',
    hideClear: true,
    wrapper: { list, text, description },
    css: {
        default: {
            color: '#ffffff',
            fontSize: '22rem',
            fontWeight: '600',
            border: 'none',
            backgroundColor: '#3F3F57',
            borderRadius: '20px',
            padding: '15px 20px',
            textAlign: 'center'
        },
        hover: {
            backgroundColor: '#23233E'
        },
    }
}

fetcher.get('domain')
    .then((r: any) => {
        list.value = r?.data?.data
        useDomainStore().list = r?.data?.data

        if (list.value) {
            if (list.value.length > 0 && !useDomainStore().id)
                for (let item of list.value) {
                    useDomainStore().title = item.title
                    useDomainStore().id = item.id
                    break
                }
        }
    })
watch(() => select?.value?.$store.model, (data: any, old: any) => {
    if (old) {
        useProjectStore().$reset()
        useDomainStore().title = data.title
        useDomainStore().id = data.id
    }
})
onMounted(() => {
    if (useDomainStore().id && useDomainStore().title)
        select.value.$store.model = { id: useDomainStore().id, title: useDomainStore().title }
})
</script>

<template>
    <div data-parent>
        <Select v-model:props="props" ref="select" />
    </div>
</template>

<style scoped>
[data-parent] {
    padding: 0 20px 0;
}
</style>