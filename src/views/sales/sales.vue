<template>
  <div v-if="allOrders" class="flex flex-col gap-8 w-full h-full p-3">
    <SalesCard v-for="item in allOrders" :key="item.id" v-bind="item" />
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
    <!-- <SalesCard
      v-for="item in sales"
      :key="item.order.id"
      :seen="true"
      :order="item.order"
      :store="item.store"
      :customer="item.customer"
    /> -->
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
