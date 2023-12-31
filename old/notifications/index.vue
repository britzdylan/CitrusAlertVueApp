<template>
  <section class="screen items-center justify-center gap-8">
    <svg width="48" height="48" class="text-zinc-500">
      <use :xlink:href="`/tabler-sprite.svg#${getIcon()}`" />
    </svg>
    <h1 class="text-center text-zinc-500 text-2xl font-normal">
      {{ getText() }}
    </h1>

    <Button v-if="!isNotificationEnabled" :loading="loading" class="btn-primary w-full"
      >Enable Push Notifications</Button
    >
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLemonStore } from '@/stores/lemon'
import { useToast } from '@/composables/toast'

const store = useLemonStore()

const loading = ref(false)
const isNotificationEnabled = computed(() => store.notificationEnabled)
const { showToast } = useToast()
const getIcon = () => {
  return isNotificationEnabled.value ? 'tabler-bell-ringing' : 'tabler-bell-off'
}

const getText = () => {
  return isNotificationEnabled.value
    ? 'Push Notifications are enabled. No need to do anything.'
    : 'Please enable push notifications on your device.'
}

const enableNotifications = async () => {
  loading.value = true
  try {
    let res
    if (store.deviceInfo?.platform === 'web') {
      return showToast('Push notifications are not supported on web.', 'error')
    }
    if (store.deviceInfo?.platform === 'ios' || store.deviceInfo?.platform === 'android') {
      res = true
    }

    if (res) {
      showToast('Push notifications enabled successfully.', 'success')
      // save to db
      const webhooks = await store.setupWebhooks(userId)
      if (webhooks instanceof Error) throw new Error('Something went wrong. Please try again.')
      if (!webhooks) throw new Error('Something went wrong. Please try again.')
      loading.value = false
    }
  } catch (error) {
    showToast('Something went wrong. Please try again.', 'error')
    console.log(error)
    loading.value = false
  }
}
</script>

<style scoped></style>
