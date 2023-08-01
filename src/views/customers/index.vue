<template>
  <section class="screen gap-3 relative">
    <header class="relative gap-4 flex items-end w-full h-20">
      <p class="text-body-xl font-bold">Customers List</p>
      <p class="ml-auto text-sm font-light">First 100</p>
    </header>
    <section class="w-full flex flex-col gap-4 relative pb-8 pt-4">
      <div
        v-for="item in allCustomers"
        class="flex justify-between gap-1 border-b-[0.5px] items-center border-zinc-200"
      >
        <!-- <div class="avatar avatar-rounded mr-1">
          <img src="/apple-touch-icon-180x180.png" />
        </div> -->
        <div class="flex flex-col gap-0 col-span-6">
          <p class="text-body-sm font-bold">{{ item.attributes.name }}</p>
          <p class="text-xs font-light">
            {{ item.attributes.email }}
          </p>
        </div>
        <div class="flex gap-1 items-center col-span-3 tooltip">
          <p class="text-body-sm font-bold">
            ${{ item.attributes.total_revenue_currency_formatted }}
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
