<script setup lang="ts">
import { useSettingsStore } from '@stores'
import type { Props } from '..'

const lang = useSettingsStore().lang
const props = defineProps<Props>()
</script>

<template>
    <span>
        <span v-if="props.minlength || props.maxlength" data-state>|</span>

        <template v-for="(error, index) in props.v" :key="error">
            <span style="color: #FF3429;" data-state v-text="lang?.validation[error]" />
            <span v-if="index !== (props?.v?.length - 1)" data-state>|</span>
        </template>

        <span v-if="props?.v?.length === 0" data-state style="color: #34C759;" v-text="lang?.validation?.valid" />
    </span>
</template>

<style scoped>
[data-state] {
    font-weight: 500;

    display: inline-block;
    margin-top: 5px;
    margin-right: 10px;
}
</style>