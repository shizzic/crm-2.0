<script setup lang="ts">
import { provide, useId } from 'vue'
import type { Props } from './'
import Wrapper from './components/Wrapper.vue'
import { emitter as cancel } from '@/views/lib/cancel'
import { useStore } from './store'

const $id = String(useId())
const $store = useStore($id)()
const passedProps = defineModel<Props>('props', { required: true })
$store.setProps(passedProps)

cancel.on('close_select', () => $store.props.active = false)
provide('$id', $id)
defineExpose({ $store })
</script>

<template>
    <div data-root>
        <select :name="$store.props.name" :form="$store.props.form" :required="$store.props.required"
            :multiple="$store.props.multiple" :disabled="$store.props.disabled" :autofocus="$store.props.autofocus"
            v-model="$store.model" />
        <div data-default :data-default-active="$store.props.active" v-text="$store.text"
            @click.stop="$store.props.active = !$store.props.active"
            :style="{ zIndex: $store.props.active ? (+$store.props.css?.default.zIndex + 2) : +$store.props.css?.default.zIndex }" />

        <KeepAlive>
            <Wrapper v-if="$store.props.active" />
        </KeepAlive>
    </div>
</template>

<style scoped>
[data-root] {
    position: relative;
}

select {
    height: 0;
    width: 0;

    position: absolute;
    right: 0;
    top: 0;
}

[data-default] {
    line-height: 1;
    position: relative;
    cursor: v-bind('$store.props.css?.default.cursor');
    text-align: v-bind('$store.props.css?.default.textAlign');
    width: v-bind('$store.props.css?.default.width');
    color: v-bind('$store.props.css?.default.color');
    font-family: v-bind('$store.props.css?.default.fontFamily');
    font-weight: v-bind('$store.props.css?.default.fontWeight');
    font-size: v-bind('$store.props.css?.default.fontSize');
    border: v-bind('$store.props.css?.default.border');
    border-color: v-bind('$store.props.css?.default.borderColor');
    border-radius: v-bind('$store.props.css?.default.borderRadius');
    background-color: v-bind('$store.props.css?.default.backgroundColor');

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    padding: v-bind('$store.props.css?.default.padding');
    transition: border-bottom-left-radius .15s ease-out, border-bottom-right-radius .1s ease-out;
}

[data-default]:hover {
    background-color: v-bind('$store.props.css?.hover.backgroundColor');
}

[data-default-active="true"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
</style>