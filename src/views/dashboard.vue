<template>
  <section class="screen gap-3 relative">
    <header class="relative gap-4 flex items-end w-full h-20">
      <p v class="text-body-xl font-bold">Dashboard</p>
    </header>
    <section id="stats" class="w-full grid grid-cols-2 gap-3">
      <div class="p-4 rounded-lg border-primary-800 border bg-primary-800 text-white flex flex-col">
        <p class="text-headline-sm font-bold leading-tight">${{ totalRevenue }}</p>
        <p class="text-body-sm font-light">Total Earned</p>
      </div>
      <div class="p-4 rounded-lg border-secondary-100 border bg-secondary-50 flex flex-col">
        <p class="text-headline-sm font-bold leading-tight">{{ totalCustomers }}</p>
        <p class="text-body-sm font-light">Total Customers</p>
      </div>
      <div class="p-4 rounded-lg border-secondary-100 border bg-secondary-50 flex flex-col">
        <p class="text-headline-sm font-bold leading-tight">{{ totalOrders }}</p>
        <p class="text-body-sm font-light">Total Orders</p>
      </div>
      <div class="p-4 rounded-lg border-secondary-100 border bg-secondary-50 flex flex-col">
        <p class="text-headline-sm font-bold leading-tight">{{ totalProducts }}</p>
        <p class="text-body-sm font-light">Total Products</p>
      </div>
    </section>
    <hr class="w-full h-[1px] bg-zinc-200 my-8" />
    <header class="w-full h-8">
      <p class="text-body-sm font-bold">Recent Orders</p>
    </header>
    <section class="w-full flex flex-col gap-4 relative pb-8 pt-4">
      <div
        v-for="item in allOrders"
        class="grid grid-cols-12 gap-1 border-b-[0.5px] items-center border-zinc-200"
      >
        <!-- <div class="avatar avatar-rounded mr-1">
          <img src="/apple-touch-icon-180x180.png" />
        </div> -->
        <div class="flex flex-col gap-0 col-span-4">
          <p class="text-body-sm font-bold">{{ item.attributes.user_name }}</p>
          <p class="text-xs font-light">
            {{ new Date(item.attributes.created_at).toDateString() }}
          </p>
        </div>
        <div class="flex flex-col gap-0 col-span-4">
          <p class="text-body-sm font-bold text-primary-800">
            +{{ item.attributes.total_formatted }}
          </p>
        </div>
        <a
          class="col-span-4 place-self-end"
          :href="item.attributes.urls.receipt"
          :title="item.attributes.user_name"
          target="_blank"
        >
          <Button class="btn-text btn-text-zinc text-xs !p-1 !gap-0"
            >Receipt

            <svg width="24" height="24">
              <use xlink:href="/tabler-sprite.svg#tabler-arrow-up-right" />
            </svg>
          </Button>
        </a>
      </div>
    </section>
    <Button @click="router.replace('/orders')" class="w-full btn-text btn-text-secondary mb-4"
      >View More

      <svg width="24" height="24">
        <use xlink:href="/tabler-sprite.svg#tabler-arrow-up-right" />
      </svg>
    </Button>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLemonStore } from '@/stores/lemon'

const store = useLemonStore()
const router = useRouter()

const totalRevenue = computed(() => {
  let total = store.allStores?.stores?.map((store) => store.attributes.total_revenue)

  return total ? (total.reduce((a, b) => a + b, 0) / 100).toFixed(2) : 0
})

const totalCustomers = computed(() => {
  return store.allCustomers?.meta?.page.total
})

const totalOrders = computed(() => {
  return store.allOrders?.meta?.page.total
})

const totalProducts = computed(() => {
  return store.allProducts?.meta?.page.total
})

const allOrders = computed(() => {
  return store.allOrders?.orders?.slice(0, 5)
})
</script>

<style scoped></style>
