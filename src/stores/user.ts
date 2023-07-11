import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '@/composables/api'
import { useToast } from '@/composables/toast'
import type { WebhookAttributes } from '@/types'

export const useUserStore = defineStore('user', () => {
  const { getData, postData, deleteData, updateData } = useApi()
  const { showToast } = useToast()
  const me = ref(null)
  const stores = ref(null)
  const orders = ref(null)
  const subscriptions = ref(null)
  const webhooks = ref(null)
  // ====================================================================================================
  async function fetchUser() {
    try {
      const { data } = await getData('users/me')
      if (!data) throw new Error('No user found or invalid api key')
      me.value = data
      return data
    } catch (error) {
      // @ts-ignore
      showToast(error, 'error')
      return null
    }
  }
  // ====================================================================================================
  async function fetchStores() {
    try {
      const { data } = await getData('stores')
      if (!data) throw new Error('No stores found or invalid api key')
      stores.value = data
      return data
    } catch (error) {
      // @ts-ignore
      showToast(error, 'error')
      return null
    }
  }
  // ====================================================================================================

  async function fetchOrders() {
    try {
      const { data } = await getData('orders')
      if (!data) throw new Error('No orders found or invalid api key')
      orders.value = data
      return data
    } catch (error) {
      // @ts-ignore
      showToast(error, 'error')
      return null
    }
  }
  // ====================================================================================================

  async function fetchSubscriptions() {
    try {
      const { data } = await getData('subscriptions')
      if (!data) throw new Error('No subscriptions found or invalid api key')
      subscriptions.value = data
      return data
    } catch (error) {
      // @ts-ignore
      showToast(error, 'error')
      return null
    }
  }
  // ====================================================================================================
  async function fetchWebhooks() {
    try {
      const { data } = await getData('webhooks')
      if (!data) throw new Error('No webhooks found or invalid api key')
      webhooks.value = data
      return data
    } catch (error) {
      // @ts-ignore
      showToast(error, 'error')
      return null
    }
  }

  async function createWebhook(payload: WebhookAttributes, storeId: string) {
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
  }

  async function updateWebhook(id: string, payload: WebhookAttributes, storeId: string) {
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
  }

  async function deleteWebhook(id: string) {
    try {
      const res = await deleteData(`webhooks/${id}`)
      if (res.status === 204) showToast('Webhook deleted', 'success')
      return true
    } catch (error) {
      // @ts-ignore
      showToast(error, 'error')
      return null
    }
  }

  async function getWebHook(id: string) {
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

  return {
    me,
    fetchUser,
    stores,
    fetchStores,
    orders,
    fetchOrders,
    subscriptions,
    fetchSubscriptions,
    webhooks,
    fetchWebhooks,
    createWebhook,
    updateWebhook,
    deleteWebhook,
    getWebHook
  }
})
