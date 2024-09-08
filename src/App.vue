<script setup lang="ts">
import { onBeforeMount, computed, provide } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { useRoute, useRouter } from 'vue-router'
import { Lang_provide } from '@/assets/symbols'

const $route = useRoute()
const $router = useRouter()
const $settings = useSettingsStore()
$settings.$persist()
const isLoggedIn = computed(() => {
  return useUserStore().id
})
const lang = computed(() => $settings.languages[$settings.locale])
provide(Lang_provide, lang)
onBeforeMount(() => {
  $settings.get_lang()
  if (!isLoggedIn.value && $route?.name !== 'login') $router.replace({ name: "login" })
})
</script>

<template>
  <RouterView v-if="lang" />
</template>