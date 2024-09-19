<script setup lang="ts">
import { computed, ref, defineAsyncComponent, onMounted, onActivated, useTemplateRef } from 'vue'
import { defaultProps } from './'
import type { Props, Model } from './'
import { $merge } from '@/assets/composables'
import { hexToCSSFilter } from 'hex-to-css-filter'
import type { HexToCssConfiguration } from 'hex-to-css-filter'
const Range = defineAsyncComponent(() => import('./components/Range.vue'))
const Errors = defineAsyncComponent(() => import('./components/Errors.vue'))

const model: Model = defineModel('model', { default: '' })
const passedProps = defineModel<Props>('props', { default: defaultProps })
const props = ref(passedProps.value)
props.value = $merge(defaultProps, passedProps.value)
const icon: string = `url(${props.value?.icon}) left no-repeat`
const colorFilter: HexToCssConfiguration = { acceptanceLossPercentage: 1, maxChecks: 10, forceFilterRecalculation: true }
const hexFilter = hexToCSSFilter(props.value?.css?.placeholder.color, colorFilter)
const errors = computed(() => {
    const r: string[] = []
    if (props.value?.v?.$silentErrors)
        for (const item of props.value.v.$silentErrors) r.push(item.$validator)
    return r
})
const pattern = computed(() => {
    if (props.value?.v?.$silentErrors)
        for (const item of props.value.v.$silentErrors) if (item.$params?.pattern) return item.$params.pattern
    return undefined
})
const input = useTemplateRef('input')
const focus = () => {
    if (props.value?.autofocus) input.value?.focus()
}
onMounted(focus)
onActivated(focus)
</script>

<template>
    <div data-wrapper @click.stop="input?.focus()">
        <h6 v-if="props?.label" v-html="props?.labelText" />

        <div data-input :data-input-icon="props?.icon">
            <input :type="props?.type" :name="props?.name" v-model.trim="model" :required="props?.v?.required"
                :placeholder="props?.placeholder" :maxlength="props?.maxlength" :minlength="props?.minlength"
                :autocomplete="props?.autocomplete" :id="props?.id" :readonly="props?.readonly"
                :pattern="pattern ? pattern : props?.pattern" ref="input">
        </div>

        <p v-if="props?.v">
            <Range v-if="props?.minlength || props?.maxlength" v-model:model="model"
                v-bind="{ v: errors, minlength: props?.minlength, maxlength: props?.maxlength }" />
            <Errors v-memo="errors" v-bind="{ v: errors, minlength: props?.minlength, maxlength: props?.maxlength }" />
        </p>
    </div>
</template>

<style scoped>
[data-input] {
    position: relative;
    cursor: text;
    width: v-bind('props.css?.default.width');
    border: v-bind('props.css?.default.border');
    border-color: v-bind('props.css?.default.borderColor');
    border-radius: v-bind('props.css?.default.borderRadius');
    background-color: v-bind('props.css?.default.backgroundColor');

    display: flex;
    justify-content: start;
    align-items: center;
}

[data-input-icon]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;

    background: v-bind(icon);
    width: 100%;
    height: 100%;
    background-size: 5.5% 50%;
    background-position: 15px;
    filter: v-bind("`${hexFilter.filter.slice(0, -1)}`");
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

    color: v-bind('props.css?.default.color');
    font-family: v-bind('props.css?.default.fontFamily');
    font-weight: v-bind('props.css?.default.fontWeight');
    font-size: v-bind('props.css?.default.fontSize');

    padding: v-bind('props.css?.default.padding');
}

input::placeholder {
    color: v-bind('props.css?.placeholder.color');
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