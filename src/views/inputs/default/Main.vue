<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from 'vue'
import type { Props } from './'
import { DefaultCSS } from './'
import type { Ref } from 'vue'
import type { CSS } from '@/assets/types'
import { $merge } from '@/assets/composables'
const Range = defineAsyncComponent(() => import('./components/Range.vue'))
const Errors = defineAsyncComponent(() => import('./components/Errors.vue'))

const model: any = defineModel()
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    autocomplete: 'on',
    autocorrect: 'off',

    label: true,
    labelText: '',
    css: () => { return {} }
})
const css: Ref<CSS> = ref($merge(DefaultCSS, props.css))
const errors = computed(() => {
    const r: string[] = []
    if (props?.v?.$silentErrors)
        for (const item of props.v.$silentErrors) r.push(item.$validator)
    return r
})
const pattern = computed(() => {
    if (props?.v?.$silentErrors)
        for (const item of props.v.$silentErrors) if (item.$params?.pattern) return item.$params.pattern
    return undefined
})
</script>

<template>
    <div data-wrapper>
        <h6 v-if="props.label" v-html="props.labelText" />
        <input :type="props.type" :name="props.name" v-model.trim="model" :required="props?.v?.required"
            :placeholder="props.placeholder" :maxlength="props.maxlength" :minlength="props.minlength"
            :autocomplete="props.autocomplete" :id="props.id" :readonly="props.readonly"
            :pattern="pattern ? pattern : props.pattern" :autofocus="props.autofocus">

        <p v-if="props.v">
            <Range v-if="props.minlength || props.maxlength" v-model="model"
                v-bind="{ v: errors, minlength: props.minlength, maxlength: props.maxlength }" />
            <Errors v-memo="errors" v-bind="{ v: errors, minlength: props.minlength, maxlength: props.maxlength }" />
        </p>
    </div>
</template>

<style scoped>
input {
    width: v-bind('css.default.width');
    color: v-bind('css.default.color');
    font-family: v-bind('css.default.fontFamily');
    font-weight: v-bind('css.default.fontWeight');
    font-size: v-bind('css.default.fontSize');
    border: v-bind('css.default.border');
    border-color: v-bind('css.default.borderColor');
    border-radius: v-bind('css.default.borderRadius');
    background-color: v-bind('css.default.backgroundColor');

    padding: v-bind('css.default.padding');
}

input::placeholder {
    color: v-bind('css.placeholder.color');
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
    /* -webkit-text-fill-color: #000; */
    -webkit-box-shadow: 0 0 0px 30px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
}
</style>