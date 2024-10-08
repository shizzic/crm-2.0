<script setup lang="ts">
import { useStore } from '../../store'
import Fields from './Fields.vue'

const $store = useStore()
</script>

<template>
    <div class="block">
        <div data-header @click="$store.$fields.expand = !$store.$fields.expand">
            <h2 v-text="$store.user?.surname + ' ' + $store.user?.firstname + ' ' + $store.user?.patronymic" />

            <div data-roles>
                <span v-for="(role, index) in $store.roles" :key="index"
                    v-text="role + ((index + 1) === $store.roles.length ? '' : ',')" />
            </div>
        </div>

        <Fields />
    </div>
</template>

<style scoped>
[data-header] {
    width: 100%;
    cursor: pointer;

    padding-bottom: 25rem;
}

h2 {
    font-weight: 700;
    font-size: 30rem;
    letter-spacing: -0.02em;
    color: var(--color-6);
}

[data-roles] {
    display: flex;
    margin-top: 8rem;
}

[data-roles] span {
    font-weight: 500;
    font-size: 20rem;
    letter-spacing: -0.02em;
    color: var(--color);
}

[data-roles] span:not(:last-of-type) {
    margin-right: 10rem;
}
</style>