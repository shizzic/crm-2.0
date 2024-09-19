<script setup lang="ts">
import { onBeforeMount, computed, watch } from 'vue'
import { useUserStore, useSettingsStore } from '@stores'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()
const $settings = useSettingsStore()
$settings.$persist()

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
  <RouterView v-if="$settings.lang" />
</template>

<style scoped>
:deep(.popper) {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 12px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>