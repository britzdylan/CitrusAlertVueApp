<template>
  <div
    class="px-6 py-3 rounded-xl bg-white border-zinc-200 border relative flex flex-col justify-start items-start gap-2 w-full max-w-sm overflow-hidden"
  >
    <span :class="seenIcon" class="dot absolute right-2 top-2"></span>
    <Pill :statusIcon="statusIcon" :class="statusColor">
      {{ attributes.total_formatted }}
    </Pill>
    <div>
      <h3 class="text-lg font-semibold truncate max-w-[300px] leading-tight">
        {{ attributes.first_order_item.product_name }}
      </h3>
      <p class="text-sm text-zinc-400">
        {{ store.attributes.name }} - #{{ attributes.order_number }}
      </p>
    </div>
    <div class="flex items-center gap-2">
      <p class="text-xs text-zinc-400">{{ attributes.user_name }} - {{ date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '@/types'
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<Order>()

const statusIcon = computed(() => {
  switch (props.attributes.status) {
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
  switch (props.attributes.status) {
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
  return props ? 'dot-green' : 'dot-yellow'
})

const date = computed(() => {
  return dayjs(props.attributes.updated_at).format('D MMM, HH:mm')
})
</script>

<style scoped></style>
