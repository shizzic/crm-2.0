<script setup lang="ts">
import { computed, inject } from 'vue'
import { useStore } from '../store'

const $store = useStore(inject('$id') as string)()
const isMinimum = computed(() => {
    return $store.props.minlength && $store.model.length < $store.props.minlength
})
const isMaximum = computed(() => {
    return $store.props.maxlength && (!$store.props.minlength || $store.props.minlength && $store.props.minlength <= $store.model.length) &&
        $store.model.length <= $store.props.maxlength
})
</script>

<template>
    <span>
        <span v-if="isMinimum" data-state style="color: #4D5DFA;"
            v-text="`${$store.model?.length}/${$store.props.minlength}`" />
        <span v-if="isMaximum" data-state style="color: #4D5DFA;"
            v-text="`${$store.model?.length}/${$store.props.maxlength}`" />
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