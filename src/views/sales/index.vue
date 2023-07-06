<template>
  <section class="screen items-center pt-0 px-0">
    <header class="w-full py-10 rounded-b-3xl bg-zinc-900 text-zinc-300 text-center mb-8">
      <p class="">Total Lifetime Revenue</p>
      <h1 class="text-5xl font-bold tracking-tight text-white">$ 3542.99</h1>
      <p class="text-sm text-zinc-600">From 3 Stores</p>
    </header>
    <PricingToggle @update:activeTab="navigate" :tabs="['Products', 'Subscriptions']" />

    <RouterView />
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const navigate = (cP: number) => {
  router.replace(cP === 0 ? '/sales' : '/sales/subscriptions')
}
</script>

<style scoped></style>
