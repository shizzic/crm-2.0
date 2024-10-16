<script setup lang="ts">
import { watch } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { useRouter } from 'vue-router'

const $router = useRouter()
const $settings = useSettingsStore()
$settings.getLang()
$settings.getTheme($settings.theme)

// console.log(JSON.parse(String(localStorage.getItem('sidebar'))))

watch(() => $settings.locale, (value, old) => {
  if (!(value in $settings.languages)) $settings.beforeLocaleSwitch = old
  $settings.getLang()
})
watch(() => useUserStore().isLoggedIn, (value) => { $router.replace(value ? { name: "home" } : { name: "login" }) })
</script>

<template>
  <RouterView v-if="$settings.lang" />
</template>