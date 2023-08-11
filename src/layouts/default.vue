<template>
  <main class="main">
    <Toast />
    <Steps v-if="popup == 'register-steps'" />
    <Confirm v-if="popup == 'confirm'" />
    <UpdateApi v-if="popup == 'update-api'" />
    <More v-if="popup == 'more'" />
    <Support v-if="popup == 'support'" />
    <DeleteAccount v-if="popup == 'delete-account'" />

    <slot v-if="!loading" />
    <Loader v-else />
    <Footer class="!p-0">
      <Navbar v-show="!loading" />
    </Footer>
  </main>
</template>

<script setup lang="ts">
import { useLemonStore } from '@/stores/lemon'
import { usePopup } from '@/composables/popup'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/toast'
import { useNotifications } from '@/composables/notifications'
import DeleteAccount from '@/components/Popover/DeleteAccount.vue'

const { popup } = usePopup()
const store = useLemonStore()
const loading = computed(() => store.loading)
const router = useRouter()
const { showToast } = useToast()
const runNotifications = useNotifications()

onMounted(async () => {
  await store.startLoading()
  try {
    await store.getAllData().then(() => {
      runNotifications()
    })
    // check notifications here
  } catch (e) {
    showToast('Something went wrong please try again', 'error')
    console.log(e)
    router.replace('/welcome')
  }
  if (!store.isAuthenticated) {
    router.replace('/welcome')
    // check notifications here
    return
  }
  await store.stopLoading()
})
</script>

<style scoped></style>
