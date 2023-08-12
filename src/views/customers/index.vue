<template>
  <section class="screen gap-3 relative">
    <header class="relative gap-4 flex items-end w-full h-20">
      <p class="text-body-xl font-bold">Customers</p>
      <p class="ml-auto text-sm font-light">Viewing the first 100 records</p>
    </header>
    <section class="w-full flex flex-col gap-4 relative pb-8 pt-4">
      <div
        v-for="item in allCustomers"
        class="grid grid-cols-12 justify-between gap-1 border-b-[0.5px] items-center border-zinc-200 pb-1"
      >
        <div class="flex flex-col gap-0 col-span-4">
          <p class="text-xs font-bold truncate whitespace-nowrap">{{ item.attributes.name }}</p>
        </div>
        <div class="flex flex-col gap-0 col-span-2">
          <p class="text-xs">{{ item.attributes.country }}</p>
        </div>
        <div class="flex flex-col gap-0 col-span-4">
          <p class="text-xs">{{ orderDate(item.attributes.created_at) }}</p>
        </div>
        <div class="flex gap-1 items-center col-span-2 place-self-end">
          <p class="text-xs font-bold text-emerald-500">
            {{ item.attributes.total_revenue_currency_formatted }}
          </p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'
import { useLemonStore } from '@/stores/lemon'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
dayjs.extend(relativeTime)
const orderDate = (date: string) => {
  return dayjs(new Date(date)).fromNow()
}
const store = useLemonStore()

const allCustomers = computed(() => {
  return store.allCustomers.customers
})

const showTooltip = ref(false)

const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value
}
</script>

<style scoped></style>
