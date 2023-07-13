<template>
  <section class="screen items-center pt-0 px-0">
    <header class="w-full py-10 rounded-b-3xl bg-zinc-900 text-zinc-300 text-center mb-8">
      <p class="">Total Lifetime Revenue</p>
      <h1 class="text-5xl font-bold tracking-tight text-white">$ {{ totalRevenue }}</h1>
      <p class="text-sm text-zinc-600">{{ totalStores }}</p>
    </header>
    <PricingToggle
      :activeTab="activeTab"
      @update:activeTab="navigate"
      :tabs="['Products', 'Subscriptions']"
    />
    <RouterView />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLemonStore } from '@/stores/lemon'

const store = useLemonStore()
const router = useRouter()
const activeTab = computed(() => (router.currentRoute.value.path === '/sales' ? 0 : 1))

const navigate = (cP: number) => {
  router.replace(cP === 0 ? '/sales' : '/sales/subscriptions')
}

const totalStores = computed(() => {
  let total = store.allStores?.stores?.length

  return `From ${total} Store${total && total > 1 ? 's' : ''}`
})

const totalRevenue = computed(() => {
  let total = store.allStores?.stores?.map((store) => store.attributes.total_revenue)

  return total ? (total.reduce((a, b) => a + b, 0) / 100).toFixed(2) : 0
})
</script>

<style scoped></style>
