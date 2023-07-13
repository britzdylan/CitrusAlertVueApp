<template>
  <div class="flex flex-col gap-8 w-full h-full p-3">
    <SalesCard
      v-if="allSubscriptions.subscriptions && allSubscriptions.subscriptions.length > 0"
      v-for="item in allSubscriptions.subscriptions"
      :key="item.id"
      :seen="true"
      v-bind="item"
    />
    <template v-else>
      <h1 class="text-center text-zinc-500 text-xl font-light mt-8">No subscriptions found.</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
const sales = [
  {
    order: {
      type: 'orders',
      id: '1',
      attributes: {
        store_id: 1,
        customer_id: 1,
        identifier: '104e18a2-d755-4d4b-80c4-a6c1dcbe1c10',
        order_number: 1,
        user_name: 'Darlene Daugherty',
        user_email: 'gernser@yahoo.com',
        currency: 'USD',
        currency_rate: '1.0000',
        subtotal: 999,
        discount_total: 0,
        tax: 200,
        total: 1199,
        subtotal_usd: 999,
        discount_total_usd: 0,
        tax_usd: 200,
        total_usd: 1199,
        tax_name: 'VAT',
        tax_rate: '20.00',
        status: 'refunded',
        status_formatted: 'Paid',
        refunded: false,
        refunded_at: null,
        subtotal_formatted: '$9.99',
        discount_total_formatted: '$0.00',
        tax_formatted: '$2.00',
        total_formatted: '$11.99',
        first_order_item: {
          id: 1,
          order_id: 1,
          product_id: 1,
          variant_id: 1,
          product_name: 'Test Limited Licencse for 2 years',
          variant_name: 'Default',
          price: 1199,
          created_at: '2021-08-17T09:45:53.000000Z',
          updated_at: '2021-08-17T09:45:53.000000Z',
          test_mode: false
        },
        urls: {
          receipt:
            'https://app.lemonsqueezy.com/my-orders/104e18a2-d755-4d4b-80c4-a6c1dcbe1c10?signature=8847fff02e1bfb0c7c43ff1cdf1b1657a8eed2029413692663b86859208c9f42'
        },
        created_at: '2021-08-17T09:45:53.000000Z',
        updated_at: '2021-08-17T09:45:53.000000Z'
      }
    },
    customer: {
      type: 'customers',
      id: '1',
      attributes: {
        store_id: 1,
        name: 'Luke Skywalker',
        email: 'lukeskywalker@example.com',
        status: 'subscribed',
        city: null,
        region: null,
        country: 'US',
        total_revenue_currency: 84332,
        mrr: 1999,
        status_formatted: 'Subscribed',
        country_formatted: 'United States',
        total_revenue_currency_formatted: '$843.32',
        mrr_formatted: '$19.99',
        created_at: '2022-12-01T13:01:07.000000Z',
        updated_at: '2022-12-09T09:05:21.000000Z',
        test_mode: false
      }
    },
    store: {
      type: 'stores',
      id: '1',
      attributes: {
        name: 'My Store',
        slug: 'my-store',
        domain: 'my-store.lemonsqueezy.com',
        url: 'https:\/\/demo-store.lemonsqueezy.com',
        avatar_url:
          'https:\/\/app.lemonsqueezy.com\/storage\/avatars\/stores\/1\/czTkMkDm4Vfb8PZehb5c29XFCm9JZyJx0AjEZP7s.png',
        plan: 'fresh',
        country: 'US',
        country_nicename: 'United States',
        currency: 'USD',
        total_sales: 1,
        total_revenue: 999,
        thirty_day_sales: 0,
        thirty_day_revenue: 0,
        created_at: '2021-05-24T14:15:06.000000Z',
        updated_at: '2021-06-15T10:03:14.000000Z'
      }
    }
  }
]
import { storeToRefs } from 'pinia'
import { useLemonStore } from '@/stores/lemon'

const store = useLemonStore()
const { allSubscriptions } = storeToRefs(store)
</script>

<style scoped></style>
