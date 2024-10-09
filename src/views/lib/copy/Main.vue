<script setup lang="ts">
import { ref, useTemplateRef, computed } from 'vue'
import type { ComputedRef } from 'vue'
import { $img } from '@composables'
import { onClickOutside } from '@vueuse/core'
import type { Props as PopperProps } from '@views/lib/popper'
import type { Props } from '.'
import { useSettingsStore } from '@stores'
import { $getFilter } from '@composables/icon'
import Image from '@views/lib/image/Main.vue'
import Popper from '@views/lib/popper/Main.vue'

const { text } = defineProps<Props>()
const copied = ref(false)
const filter = computed(() => $getFilter(getComputedStyle(document.documentElement).getPropertyValue(`--color-${copied.value ? 6 : 4}`)))
const element = useTemplateRef('element')
const popperProps: ComputedRef<PopperProps> = computed(() => {
    const result: PopperProps = {
        content: useSettingsStore().lang?.other?.copy?.[String(copied.value)],
        placement: 'top',
        interactive: false
    }
    return result
})

onClickOutside(element, () => copied.value = false)
function copy(): void {
    navigator.clipboard.writeText(String(text))
    copied.value = true
}
</script>

<template>
    <div data-copy-wrapper ref="element" @click="copy">
        <Popper v-model:props="popperProps">
            <Image :src="$img(`@views/lib/copy/${copied ? 'copied' : 'not_copied'}.webp`)" :key="String(copied)" />
        </Popper>
    </div>
</template>

<style scoped>
[data-copy-wrapper] {
    cursor: pointer;
    max-height: 100%;
    width: 20rem;

    display: flex;
    align-items: center;

    margin-left: 10px;
}

img {
    width: 100%;
    height: 100%;
    filter: v-bind(filter);
}
</style>