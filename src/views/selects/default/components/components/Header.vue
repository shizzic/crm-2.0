<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { Props } from '../..'
import { useSettingsStore } from '@stores'
import { emitter as cancel } from '@/views/other/cancel'

const lang = useSettingsStore().lang
const props = inject('$props') as Ref<Props>
const model: any = inject('$model')
const clear = (): void => {
    if (!props.value.multiple) {
        const old = model.value
        model.value = undefined

        if (old)
            cancel.emit('close_select')
    }
}
</script>

<template>
    <div data-header>
        <h6 v-text="props?.wrapper.description" />
        <button v-if="!props.hideClear" @click.stop="clear" v-text="lang?.other?.clear" />
    </div>
</template>

<style scoped>
[data-header] {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px 0;
}

[data-header] h6 {
    color: v-bind('props.css?.wrapper.Header.description.color');
    font-size: calc(v-bind('props.css?.default.fontSize') - 4rem);
    font-weight: 600;

    margin-right: 15px;
}

[data-header] button {
    cursor: pointer;
    align-self: flex-start;
    color: v-bind('props.css?.wrapper.Header.clear.color');
    font-size: calc(v-bind('props.css?.default.fontSize') - 4rem);
    font-weight: 500;
    outline: none;
    border: none;
    background: none;
}

[data-header] button:hover {
    text-decoration: underline;
}
</style>