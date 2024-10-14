<script setup lang="ts">
import { inject, computed, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { Props as PopperProps } from '@views/lib/popper'
import type { Props } from '@views/lib/toggle'
import { useNavStore } from '../store'
import { useSettingsStore } from '@stores'
import Popper from '@views/lib/popper/Main.vue'
import Toggle from '@views/lib/toggle/Toggle.vue'

const $store = useNavStore()
const align = inject('align') as string
const model = ref($store.width)
const props: ComputedRef<Props> = computed(() => {
    return {
        attributes: {
            id: 'navbar_expander',
            name: 'navbar_expander',
            trueValue: $store.maxWidth,
            falseValue: $store.minWidth,
        }
    }
})
const popper: ComputedRef<PopperProps> = computed(() => {
    return {
        content: $store.width === $store.minWidth ? useSettingsStore().lang?.nav.expand : '', placement: 'right'
    }
})
watch(model, (value) => { if (value) $store.width = value })
watch(() => $store.width, (value) => { if (value) model.value = value })
</script>

<template>
    <div data-expander @click="$store.changeNavWidth">
        <Popper v-model:props="popper" style="width: 100%">
            <div data-expander>
                <Toggle v-model:model="model" v-model:props="props" style="align-self: flex-start;" />

                <span v-show="$store.width === $store.maxWidth" data-nav-item-text
                    v-text="useSettingsStore().lang?.nav.expand" />
            </div>
        </Popper>
    </div>
</template>

<style scoped>
[data-expander] {
    cursor: pointer;
    width: 100%;
    flex-grow: 1;

    display: flex;
    justify-content: v-bind(align);
    align-items: center;
    margin-bottom: 15rem;
}

[data-nav-item-text] {
    font-weight: 600;
    font-size: 17rem;
    letter-spacing: -0.02em;
    color: var(--color);
    word-break: break-all;

    padding-left: 10rem;
}
</style>