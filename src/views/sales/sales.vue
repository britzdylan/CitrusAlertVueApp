<template>
  <div class="flex flex-col gap-8 w-full h-full p-3">
    <SalesCard
      v-if="allOrders.orders && allOrders.orders.length > 0"
      v-for="item in allOrders.orders"
      :key="item.id"
      v-bind="item"
    />
    <!-- <div
      @click="showOlderSales = !showOlderSales"
      class="flex items-center w-full text-zinc-400 text-sm gap-6"
    >
      <p class="leading-4">Older</p>
      <hr class="bg-zinc-600 flex-grow mt-[2px]" />
    <svg width="24" height="24">
          <use :xlink:href="`/tabler-sprite.svg#${icon}`" />
        </svg> 
    </div> -->
    <template v-else>
      <h1 class="text-center text-zinc-500 text-xl font-light mt-8">No orders found.</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLemonStore } from '@/stores/lemon'

const store = useLemonStore()
const { allOrders } = storeToRefs(store)

// const showOlderSales = ref(false)

// const icon = computed(() => {
//   return showOlderSales.value ? 'tabler-eye' : 'tabler-eye-off'
// })
</script>

<style scoped></style>
