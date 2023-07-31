<template>
  <section class="screen gap-3 relative">
    <header class="relative gap-4 flex items-end w-full h-20">
      <p class="text-body-xl font-bold">Orders List</p>
      <p class="ml-auto text-sm font-light">First 100</p>
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
          <p class="text-body-sm font-bold text-primary-600">
            +{{ item.attributes.total_formatted }}
          </p>
        </div>
        <a
          class="col-span-4 place-self-end"
          :href="item.attributes.urls.receipt"
          :title="item.attributes.user_name"
          target="_blank"
        >
          <Button class="btn-text btn-text-tertiary text-xs !p-1 !gap-0"
            >Receipt

            <svg width="24" height="24">
              <use xlink:href="/tabler-sprite.svg#tabler-arrow-up-right" />
            </svg>
          </Button>
        </a>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLemonStore } from '@/stores/lemon'

const store = useLemonStore()

const allOrders = computed(() => {
  return store.allOrders.orders
})
</script>

<style scoped></style>
