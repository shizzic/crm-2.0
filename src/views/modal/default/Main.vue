<script setup lang="ts">
import vClickOutside from '@/views/other/vClickOutside'
import { events as cancel } from '@views/other/cancel'
</script>

<template>
    <div id="modal">
        <div v-click-outside="() => { cancel.emit('default') }">
            <slot />
        </div>
    </div>
</template>

<style>
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
}
</style>