<script setup lang="ts">
import { watch, onBeforeMount } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { loadUserSettings } from '@stores/settings/saving'
import { useRouter } from 'vue-router'

const $router = useRouter()
const $settings = useSettingsStore()

onBeforeMount(() => {
  loadUserSettings()
  $settings.getTheme($settings.theme)
  $settings.getLang()
})
watch(() => useUserStore().isLoggedIn, (value) => {
  if (value) loadUserSettings()
  $router.replace(value ? { name: "home" } : { name: "login" })
})
</script>

<template>
  <RouterView v-if="$settings.lang" />
</template>