<script setup lang="ts">
import { watch } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { loadUserSettings } from '@stores/settings/saving'
import { useRouter } from 'vue-router'

const $router = useRouter()
const $settings = useSettingsStore()
$settings.getLang()
$settings.getTheme($settings.theme)

loadUserSettings()
watch(() => useUserStore().isLoggedIn, (value) => {
  if (value) loadUserSettings()
  $router.replace(value ? { name: "home" } : { name: "login" })
})
</script>

<template>
  <RouterView v-if="$settings.lang" />
</template>