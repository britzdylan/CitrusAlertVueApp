import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/composables/api'
import { useToast } from '@/composables/toast'
import { useStorage } from '@/composables/storage'
import type { WebhookAttributes } from '@/types'

const { getData, postData, deleteData, updateData } = useApi()
const { showToast } = useToast()
const { get, set, remove } = useStorage()

export const useLemonStore = defineStore('Lemon', {
  state: () => ({
    user: null,
    stores: null,
    orders: null,
    subscriptions: null,
    webhooks: null,
    lastFetch: null
  }),
  getters: {
    isAuthenticated: () => {
      return this?.user !== null
    },
    allOrders: () => {
      return this?.orders
    },
    allSubscriptions: () => {
      return this?.subscriptions
    },
    allWebhooks: () => {
      return this?.webhooks
    },
    allStores: () => {
      return this?.stores
    }
  },
  actions: {
    async getAllData(): Promise<boolean> {
      const localData = await get('citrus_data')
      if (localData) {
        const data = JSON.parse(localData)
        // let [user, stores, orders, subscriptions, webhooks] = data
        console.log('Data fetched from local storage', data)
        Object.keys(data).forEach((key) => {
          this[key] = data[key]
        })
        return true
      }
      console.log('Fetching data from API')
      await remove('citrus_data')
      const data = await Promise.all([
        this.fetchUser(),
        this.fetchStores(),
        this.fetchOrders(),
        this.fetchSubscriptions(),
        this.fetchWebhooks()
      ])
      // @ts-ignore
      let [user, stores, orders, subscriptions, webhooks] = data
      let modeledData = {
        user,
        stores,
        orders,
        subscriptions,
        webhooks,
        lastFetch: new Date()
      }

      Object.keys(modeledData).forEach((key) => {
        this[key] = data[key]
      })
      await set('citrus_data', JSON.stringify(modeledData))
      return true
    },
    async fetchUser() {
      try {
        const { data } = await getData('users/user')
        if (!data) throw new Error('No user found or invalid api key')
        this.user = data
        return data
      } catch (error) {
        // @ts-ignore
        showToast(error, 'error')
        return null
      }
    },
    async fetchStores() {
      try {
        const { data } = await getData('stores')
        if (!data) throw new Error('No stores found or invalid api key')
        this.stores = data
        return data
      } catch (error) {
        // @ts-ignore
        showToast(error, 'error')
        return null
      }
    },

    async fetchOrders() {
      try {
        const { data } = await getData('orders')
        if (!data) throw new Error('No orders found or invalid api key')
        this.orders = data
        return data
      } catch (error) {
        // @ts-ignore
        showToast(error, 'error')
        return null
      }
    },

    async fetchSubscriptions() {
      try {
        const { data } = await getData('subscriptions')
        if (!data) throw new Error('No subscriptions found or invalid api key')
        this.subscriptions = data
        return data
      } catch (error) {
        // @ts-ignore
        showToast(error, 'error')
        return null
      }
    },
    async fetchWebhooks() {
      try {
        const { data } = await getData('webhooks')
        if (!data) throw new Error('No webhooks found or invalid api key')
        this.webhooks = data
        return data
      } catch (error) {
        // @ts-ignore
        showToast(error, 'error')
        return null
      }
    },

    async createWebhook(payload: WebhookAttributes, storeId: string) {
      const webhook = {
        type: 'webhooks',
        attributes: {
          ...payload
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: storeId
            }
          }
        }
      }

      try {
        const { data } = await postData('webhooks', webhook)
        if (!data) throw new Error('Error creating webhook or invalid api key')
        return data
      } catch (error) {
        // @ts-ignore
        showToast(error, 'error')
        return null
      }
    },

    async updateWebhook(id: string, payload: WebhookAttributes, storeId: string) {
      const webhook = {
        type: 'webhooks',
        id: id,
        attributes: {
          ...payload
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: storeId
            }
          }
        }
      }
      try {
        const { data } = await updateData(`webhooks/${id}`, webhook)
        if (!data) throw new Error('Error updating webhook or invalid api key')
        return data
      } catch (error) {
        // @ts-ignore
        showToast(error, 'error')
        return null
      }
    },

    async deleteWebhook(id: string) {
      try {
        const res = await deleteData(`webhooks/${id}`)
        if (res.status === 204) showToast('Webhook deleted', 'success')
        return true
      } catch (error) {
        // @ts-ignore
        showToast(error, 'error')
        return null
      }
    },
    async getWebHook(id: string) {
      try {
        const { data } = await getData(`webhooks/${id}`)
        if (!data) throw new Error('No webhook found or invalid api key')
        return data
      } catch (error) {
        // @ts-ignore
        showToast(error, 'error')
        return null
      }
    }
  }
})
