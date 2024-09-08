<script setup lang="ts">
import { onBeforeMount, computed, provide, watch } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { useRoute, useRouter } from 'vue-router'
import { Lang_provide } from '@symbols'

const $route = useRoute()
const $router = useRouter()
const $settings = useSettingsStore()
$settings.$persist()
const lang = computed(() => $settings.languages[$settings.locale])
provide(Lang_provide, lang)

onBeforeMount(() => {
  $settings.get_lang()
  if (!isLoggedIn.value && $route?.name !== 'login') $router.replace({ name: "login" })
})

const isLoggedIn = computed(() => {
  return Boolean(useUserStore().id)
})
watch(isLoggedIn, (value: boolean) => { $router.replace(value ? { name: "home" } : { name: "login" }) })
</script>

<template>
  <RouterView v-if="lang" />
</template>