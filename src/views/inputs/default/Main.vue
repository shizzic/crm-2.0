<script setup lang="ts">
import { defineAsyncComponent, onMounted, onActivated, useTemplateRef, useId, provide } from 'vue'
import type { Props, InputModel } from './'
import { useStore } from './store'
const Range = defineAsyncComponent(() => import('./components/Range.vue'))
const Errors = defineAsyncComponent(() => import('./components/Errors.vue'))

const $id = String(useId())
const $store = useStore($id)()
const passedProps = defineModel<Props>('props')
const model: InputModel = defineModel('model', { default: '' })
const v = defineModel('v')
$store.setProps(passedProps, model, v)

const input = useTemplateRef('input') // ref на настоящий input
const focus = () => { if ($store.props.autofocus) input.value?.focus() }

provide('$id', $id)
onMounted(focus)
onActivated(focus)
</script>

<template>
    <div data-wrapper @click.stop="input?.focus()">
        <h6 v-if="$store.props.label" v-html="$store.props.labelText" ref="input" />

        <div data-input :data-input-icon="$store.props.icon?.url">
            <input v-model.trim="model" :type="$store.props.type" :name="$store.props.name"
                :required="$store.v?.required" :placeholder="$store.props.placeholder"
                :maxlength="$store.props.maxlength" :minlength="$store.props.minlength"
                :autocomplete="$store.props.autocomplete" :id="$store.props.id" :readonly="$store.props.readonly"
                :pattern="$store.pattern || $store.props.pattern" ref="input">
        </div>

        <p v-if="$store.v">
            <Range v-if="$store.props.minlength || $store.props.maxlength" />
            <Errors v-memo="$store.errors" />
        </p>
    </div>
</template>

<style scoped>
[data-wrapper] {
    width: v-bind('$store.props.css?.default.width');
}

[data-input] {
    position: relative;
    cursor: text;
    width: 100%;
    border: v-bind('$store.props.css?.default.border');
    border-color: v-bind('$store.props.css?.default.borderColor');
    border-radius: v-bind('$store.props.css?.default.borderRadius');
    background-color: v-bind('$store.props.css?.default.backgroundColor');

    display: flex;
    justify-content: start;
    align-items: center;
}

[data-input-icon]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-image: v-bind('$store.icon?.url');
    background-size: v-bind('$store.icon?.size');
    background-position: v-bind('$store.icon?.position');
    background-repeat: v-bind('$store.icon?.repeat');
    filter: v-bind('$store.icon?.filter');
}

input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    line-height: 1;
    background-color: inherit;
    border-radius: inherit;
    background-color: inherit;

    color: v-bind('$store.props.css?.default.color');
    font-family: v-bind('$store.props.css?.default.fontFamily');
    font-weight: v-bind('$store.props.css?.default.fontWeight');
    font-size: v-bind('$store.props.css?.default.fontSize');

    padding: v-bind('$store.props.css?.default.padding');
}

input::placeholder {
    color: v-bind('$store.props.css?.placeholder.color');
}

[data-input]:focus-within {
    border-color: #000;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
    /* -webkit-text-fill-color: #000; */
    -webkit-box-shadow: 0 0 0px 30px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
}
</style>