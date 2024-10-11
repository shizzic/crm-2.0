<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { emitter as cancel } from '@views/lib/cancel'

const content = useTemplateRef('content')
onClickOutside(content, () => { cancel.emit('default') })
</script>

<template>
    <div id="modal">
        <div data-modal-wrapper ref="content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
#modal {
    width: 100%;
    height: 100%;
    background-color: rgba(3, 3, 3, 0.5);

    position: fixed;
    left: 0;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
}

[data-modal-wrapper] {
    height: max-content;
    width: max-content;
}
</style>