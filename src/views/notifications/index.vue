<template>
  <section class="screen items-center justify-center gap-8">
    <svg width="48" height="48" class="text-zinc-500">
      <use :xlink:href="`/tabler-sprite.svg#${getIcon()}`" />
    </svg>
    <h1 class="text-center text-zinc-500 text-2xl font-normal">
      {{ getText() }}
    </h1>
    <button v-if="!isNotificationEnabled" class="btn btn-primary w-full">
      Enable Push Notifications
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isNotificationEnabled = ref(false)
const getIcon = () => {
  return isNotificationEnabled.value ? 'tabler-bell-ringing' : 'tabler-bell-off'
}

const getText = () => {
  return isNotificationEnabled.value
    ? 'Push Notifications are enabled. No need to do anything.'
    : 'Please enable push notifications on your device.'
}
</script>

<style scoped></style>
