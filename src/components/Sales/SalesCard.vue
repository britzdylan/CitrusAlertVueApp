<template>
  <div
    class="px-6 py-3 rounded-xl bg-white border-zinc-200 border relative flex flex-col justify-start items-start gap-2 w-full max-w-sm overflow-hidden"
  >
    <span :class="seenIcon" class="dot absolute right-2 top-2"></span>
    <UIPill :statusIcon="statusIcon" :class="statusColor">
      {{ order.attributes.total_formatted }}
    </UIPill>
    <div>
      <h3 class="text-lg font-semibold truncate max-w-[300px] leading-tight">
        {{ order.attributes.first_order_item.product_name }}
      </h3>
      <p class="text-sm text-zinc-400">
        {{ store.attributes.name }} - #{{ order.attributes.order_number }}
      </p>
    </div>
    <div class="flex items-center gap-2">
      <p class="text-xs text-zinc-400">{{ order.attributes.user_name }} - {{ date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Order, type Customer, type Store } from '@/types'
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{
  order: Order
  store: Store
  customer: Customer
  seen: boolean
}>()

const statusIcon = computed(() => {
  switch (props.order.attributes.status) {
    case 'paid':
      return 'tabler-plus'
    case 'pending':
      return 'tabler-clock'
    case 'failed':
      return 'tabler-alert-triangle'
    case 'refunded':
      return 'tabler-refresh'
    default:
      return 'tabler-alert-triangle'
  }
})

const statusColor = computed(() => {
  switch (props.order.attributes.status) {
    case 'paid':
      return 'pill-green'
    case 'pending':
      return 'pill-yellow'
    case 'failed':
      return 'pill-red'
    case 'refunded':
      return 'pill-zinc'
  }
})

const seenIcon = computed(() => {
  return props.seen ? 'dot-green' : 'dot-yellow'
})

const date = computed(() => {
  return dayjs(props.order.attributes.updated_at).format('D MMM, HH:mm')
})
</script>

<style scoped></style>
