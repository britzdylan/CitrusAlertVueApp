<template>
  <div class="flex flex-col gap-8 w-full h-full p-3">
    <template v-if="allSubscriptions.subscriptions && allSubscriptions.subscriptions.length > 0">
      <SalesCard
        v-for="item in allSubscriptions.subscriptions"
        :key="item.id"
        :seen="true"
        v-bind="item"
      />
    </template>
    <template v-else>
      <h1 class="text-center text-zinc-500 text-xl font-light mt-8">No subscriptions found.</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLemonStore } from '@/stores/lemon'

const store = useLemonStore()
const { allSubscriptions } = storeToRefs(store)
</script>

<style scoped></style>