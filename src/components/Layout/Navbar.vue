<template>
  <nav class="tabs grid grid-cols-5 tabs-zinc-navigation tabs-mobile bg-zinc-800 pb-10">
    <button @click="router.push('/dashboard')" :class="getActiveTab('dashboard')">
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-layout-grid" />
      </svg>
      Dashboard
    </button>

    <button @click="router.push('/orders')" :class="getActiveTab('orders')">
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-box-seam" />
      </svg>
      Orders
    </button>

    <button @click="router.push('/customers')" :class="getActiveTab('customers')">
      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-user" />
      </svg>
      Customers
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

button.active {
  @apply text-zinc-100;
}

button {
  @apply text-zinc-400;
}
</style>
