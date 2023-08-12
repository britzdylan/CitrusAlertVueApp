<template>
  <section class="screen gap-3 relative">
    <header class="relative gap-4 flex items-end w-full h-20">
      <p class="text-body-xl font-bold">Orders</p>
      <p class="ml-auto text-sm font-light">Viewing the first 100 records</p>
    </header>
    <section class="w-full flex flex-col gap-4 relative pb-8 pt-4">
      <div
        v-for="item in allOrders"
        class="grid grid-cols-12 gap-1 border-b-[0.5px] items-center border-zinc-200 pb-1"
      >
        <!-- <div class="avatar avatar-rounded mr-1">
          <img src="/apple-touch-icon-180x180.png" />
        </div> -->
        <p class="col-span-1 text-xs">#{{ item.attributes.order_number }}</p>

        <div class="flex flex-col gap-0 col-span-5">
          <p class="text-xs font-bold truncate whitespace-nowrap">{{ item.attributes.first_order_item.product_name }}</p>
        </div>
        <p class="text-xs font-light col-span-3 place-self-end">
          {{ orderDate(item.attributes.created_at) }}
        </p>
        <div class="flex flex-col gap-0 col-span-3 place-self-end">
          <p class="text-xs font-bold text-emerald-500">
            +{{ item.attributes.total_formatted }}
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLemonStore } from '@/stores/lemon'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const store = useLemonStore()

const allOrders = computed(() => {
  return store.allOrders.orders
})

const orderDate = (date: string) => {
  return dayjs(new Date(date)).fromNow()
}
</script>

<style scoped></style>
