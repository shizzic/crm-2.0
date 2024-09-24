<script setup lang="ts">
import { computed, watch } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { useRouter } from 'vue-router'

const $router = useRouter()
const $settings = useSettingsStore()
$settings.$persist()
$settings.get_lang()
const isLoggedIn = computed(() => Boolean(useUserStore().id))

watch(isLoggedIn, (value) => { $router.replace(value ? { name: "home" } : { name: "login" }) })
</script>

<template>
  <RouterView v-if="$settings.lang" />
</template>