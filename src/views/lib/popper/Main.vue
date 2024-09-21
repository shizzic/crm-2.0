<script setup lang="ts">
import type { Props } from "."
import { defaultProps, getProps } from "."
import Popper from "vue3-popper"

const passedProps = defineModel<Props>('props', { default: defaultProps })
const props = getProps(passedProps)
</script>

<template>
    <Popper v-bind="props">
        <slot />
    </Popper>
</template>

<style scoped>
:deep(.popper) {
    font-size: 13rem;
    --popper-theme-background-color: #333333;
    --popper-theme-background-color-hover: #333333;
    --popper-theme-text-color: #ffffff;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 12px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>