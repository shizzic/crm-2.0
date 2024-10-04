<script setup lang="ts">
import { useId } from "vue"
import type { Props } from "."
import Popper from "vue3-popper"
import { useStore } from "./store"
import { defaultProps } from "."

const $id = String(useId())
const $store = useStore($id)()
const passedProps = defineModel<Props>('props', { default: defaultProps })
$store.setParams(passedProps)
</script>

<template>
    <Popper v-bind="$store.props">
        <slot />
    </Popper>
</template>

<style scoped>
:deep(.popper) {
    font-size: 13rem;
    font-weight: v-bind('$store.props?.css?.default.fontWeight');

    --popper-theme-background-color: var(--popper-bg);
    --popper-theme-background-color-hover: var(--popper-bg);
    --popper-theme-text-color: var(--popper-text);
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 12px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>