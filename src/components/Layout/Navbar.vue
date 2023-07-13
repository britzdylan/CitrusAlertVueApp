<template>
  <nav
    class="tabs grid grid-cols-4 tabs-zinc-mobile tabs-zinc-bordered tabs-mobile bg-primary-50 rounded-t-2xl"
  >
    <button @click="router.push('/sales')" :class="getActiveTab('sales')">
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-report-money" />
      </svg>
      Sales
    </button>

    <button @click="router.push('/notifications')" :class="getActiveTab('notifications')">
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-bell" />
      </svg>
      Notifications
    </button>

    <button @click="router.push('/settings')" :class="getActiveTab('settings')">
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-settings" />
      </svg>
      Settings
    </button>

    <button @click="showPopup('more')" :class="getActiveTab('more')">
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-menu" />
      </svg>
      More
    </button>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { usePopup } from '@/composables/popup'
const route = useRoute()
const router = useRouter()
const { showPopup } = usePopup()
const getActiveTab = (cP: string) => {
  const { path } = route
  const activeTab = path.split('/')[1]
  return activeTab === cP ? 'active' : ''
}
</script>

<style scoped>
.tabs-mobile {
  & button {
    @apply py-4 px-0;
  }
}

.tabs-zinc-bordered button.active {
  @apply text-primary-700 border-primary-500;
}
</style>
