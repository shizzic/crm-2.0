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
const passedModel = defineModel<any>('model')
$store.model = passedModel.value
const passedIndex = defineModel<any>('index')
$store.index = passedIndex.value

cancel.on('close_select', () => $store.props.active = false)
provide('$id', $id)
defineExpose({ $store })
</script>

<template>
    <div data-root>
        <select :name="$store.props.name" :form="$store.props.form" :required="$store.props.required"
            :multiple="$store.props.multiple" :disabled="$store.props.disabled" :autofocus="$store.props.autofocus"
            v-model="$store.model" />

        <div data-default :data-default-active="$store.props.active"
            @click.stop="$store.props.active = !$store.props.active"
            :style="{ zIndex: $store.props.active ? (+$store.props.css?.default.zIndex + 2) : +$store.props.css?.default.zIndex }">
            {{ $store.text }}
            <i v-if="$store.props.arrow" data-arrow :data-arrow-active="$store.props.active" />
        </div>

        <KeepAlive>
            <Wrapper />
        </KeepAlive>
    </div>
</template>

<style scoped>
[data-root] {
    position: relative;
    width: v-bind('$store.props.css?.default.width');
    min-width: v-bind('$store.props.css?.default.minWidth');
    max-width: v-bind('$store.props.css?.default.maxWidth');
}

select {
    height: 0;
    width: 0;

    position: absolute;
    right: 0;
    top: 0;
}

[data-default] {
    position: relative;
    line-height: 1;
    cursor: v-bind('$store.props.css?.default.cursor');
    text-align: v-bind('$store.props.css?.default.textAlign');
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

    display: flex;
    align-items: center;
    justify-content: v-bind('$store.props.css?.default.textAlign');
    padding: v-bind('$store.props.css?.default.padding');
    transition: border-bottom-left-radius .15s ease-out, border-bottom-right-radius .1s ease-out;
}

[data-default]:hover {
    background-color: v-bind('$store.props.css?.hover.backgroundColor');
}

[data-default-active="true"] {
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

[data-arrow] {
    border: solid v-bind('$store.props.css?.default.color');
    border-width: 0 2px 2px 0;

    position: absolute;
    right: 20px;

    display: inline-block;
    padding: 3px;

    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transition: transform .2s ease-out, -webkit-transform .2s ease-out;
}

[data-arrow-active="true"] {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
</style>