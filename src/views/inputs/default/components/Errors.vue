<script setup lang="ts">
import { inject } from 'vue'
import { useSettingsStore } from '@stores'
import { useStore } from '../store'

const lang = useSettingsStore().lang
const $store = useStore(String(inject('$id')))()
</script>

<template>
    <span>
        <span v-if="$store.props.minlength || $store.props.maxlength" data-state>|</span>

        <template v-for="(error, index) in $store.errors" :key="error">
            <span style="color: #FF3429;" data-state v-text="lang?.validation[error]" />
            <span v-if="index !== ($store.errors.length - 1)" data-state v-text="'|'" />
        </template>

        <span v-if="$store.v && $store.errors.length === 0" data-state style="color: #34C759;"
            v-text="lang?.validation?.valid" />
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