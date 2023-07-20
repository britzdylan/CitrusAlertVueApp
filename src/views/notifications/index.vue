<template>
  <section class="screen items-center justify-center gap-8">
    <svg width="48" height="48" class="text-zinc-500">
      <use :xlink:href="`/tabler-sprite.svg#${getIcon()}`" />
    </svg>
    <h1 class="text-center text-zinc-500 text-2xl font-normal">
      {{ getText() }}
    </h1>

    <Button
      v-if="!isNotificationEnabled"
      @click="enableNotifications"
      :loading="loading"
      class="btn-primary w-full"
      >Enable Push Notifications</Button
    >
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCitrus } from '@/composables/citrus'
import { useToast } from '@/composables/toast'
import { useLemonStore } from '@/stores/lemon'

const { runWebSetup, runNativeSetup } = useCitrus()
const { showToast } = useToast()
const store = useLemonStore()

const loading = ref(false)
const isNotificationEnabled = computed(() => store.notificationEnabled)

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
      res = await runWebSetup()
    } else {
      res = await runNativeSetup()
    }
    console.log(res, 'RESSSSSSSSSSSS')
    if (res) {
      showToast('Push notifications enabled successfully.', 'success')
      await store.checkNotificationPermissions()
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
