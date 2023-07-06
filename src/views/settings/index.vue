<template>
  <section class="screen gap-3">
    <header class="relative px-4 gap-4 flex items-center justify-center w-full h-20">
      <p v class="text-body-lg font-bold text-center mx-auto">Account Settings</p>
    </header>
    <Input
      v-model="key"
      disabled
      label="Manage Your LemonSqueezy API key"
      type="password"
      class="items-start mx-auto w-full"
      helper="Your API key is top secret and we take extra precautions to keep it safe. Do not share it with anyone."
      placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
    />
    <button @click="showPopup('update-api')" class="btn btn-primary w-full mt-auto">
      Update my API key
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePopup } from '@/composables/popup'
const { showPopup } = usePopup()
const isNotificationEnabled = ref(true)
const key = ref('')
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
