<script setup lang="ts">
import { useId } from "vue"
import type { Index } from "@types"
import { $getDeep } from "@composables"
import type { Props, Model } from "."
import { defaultProps } from '.'
import { useStore } from "./store"

const $id = String(useId())
const $store = useStore($id)()
const passedProps = defineModel<Props>('props', { default: defaultProps })
const passedModel = defineModel<Model>('model')
const passedIndex = defineModel<Index>('index')
$store.setWatchers(passedModel, passedIndex)
$store.setParams(passedProps, passedModel, passedIndex)
</script>

<template>
    <div data-root>
        <h6 v-if="$store.props.label" v-html="$store.props.labelText" />

        <div v-for="(item, index) in $store.props?.list" :key="index" data-item @click="$store.set(item, index)">
            <label :for="`radio/${$id}/${index}`">
                <input type="radio" :id="`radio/${$id}/${index}`" :value="item" v-model="$store.model"
                    :checked="$store.index === index">

                {{ $getDeep(item, $store.props.deep || []) }}
            </label>
        </div>
    </div>
</template>

<style scoped>
[data-root] {
    width: v-bind('$store.props.css?.default.width');

    padding: v-bind('$store.props.css?.default.padding');
    margin: v-bind('$store.props.css?.default.margin');
}

[data-item] {
    cursor: pointer;

    display: flex;
    align-items: center;
}

[data-item]:not(:last-of-type) {
    margin-bottom: 2rem;
}

label {
    cursor: inherit;
    letter-spacing: -0.02em;
    color: v-bind('$store.props.css?.label.color');
    font-size: v-bind('$store.props.css?.label.fontSize');
    font-weight: v-bind('$store.props.css?.label.fontWeight');

    padding: v-bind('$store.props.css?.label.padding');
    display: flex;
    align-items: center;
}

input {
    cursor: inherit;
    box-sizing: border-box;
    border-radius: 50%;
    appearance: none;
    background-color: transparent;
    outline: none;
    width: v-bind('$store.props.css?.dot.width');
    height: v-bind('$store.props.css?.dot.height');
    border: v-bind('$store.props.css?.dot.border');
    border-color: v-bind('$store.props.css?.dot.borderColor');

    margin-right: v-bind('$store.props.css?.dot.paddingRight');
    transition: border 130ms linear;
}

input:not(:disabled):checked {
    border: v-bind('$store.props.css?.dot.Checked.border');
    border-color: v-bind('$store.props.css?.dot.Checked.borderColor');
}

/* input[type="radio"]:disabled {
  background-color: var(--radio-disabled-bg-color);
}

input[type="radio"]:disabled:checked {
  background-image: radial-gradient(
    circle,
    var(--radio-border-color) 0%,
    var(--radio-border-color) 50%,
    transparent 50%,
    transparent 100%
  );
} */
</style>