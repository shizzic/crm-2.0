<script setup lang="ts">
import type { Props } from '../ts'
import Ranges from './Ranges.vue'
import Messages from './Messages.vue'

const model: any = defineModel()
const props = defineProps<Props>()
</script>

<template>
    <p>
        <Ranges v-if="model.length > 0 && (props.maxlength || props.minlength)" v-bind="props" v-model="model" />
        <Messages v-bind="{ v: props.v, id: props.id }" />
    </p>
</template>

<style scoped>
p {
    margin-left: 22px;
}

span {
    font-family: Metropolis, sans-serif;
    font-weight: Medium;
    font-size: 13px;

    display: inline-block;
    margin-top: 5px;
}

span:not(:last-child) {
    margin-right: 10px;
}
</style>