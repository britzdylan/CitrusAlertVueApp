import { defineStore } from 'pinia'
import { useApi } from '@/composables/api'
import { useToast } from '@/composables/toast'
import { useStorage } from '@/composables/storage'
import { useNotifications } from '@/composables/notifications'
import { useFirebaseMessaging } from '@/composables/webMessaging'
import { Device } from '@capacitor/device'

import type { Webhook, Order, User, Store, ApiResponse } from '@/types'

const { getData, postData, deleteData, updateData } = useApi()
const { showToast } = useToast()
const { get, remove } = useStorage()

const { checkNotificationPermissions } = useNotifications()

interface DeviceInfo {
  isVirtual: boolean
  manufacturer: string
  model: string
  operatingSystem: string
  osVersion: string
  platform: string
  webViewVersion: string
}
interface State {
  user: ApiResponse<User[]> | null
  stores: ApiResponse<Store[]> | null
  orders: ApiResponse<Order[]> | null
  subscriptions: ApiResponse<Order[]> | null
  webhooks: ApiResponse<Webhook[]> | null
  lastFetch: Date | null
  loading: boolean
  notificationEnabled: boolean | null
  deviceInfo: DeviceInfo | null
}

export const useLemonStore = defineStore('Lemon', {
  state: (): State => {
    return {
      user: null,
      stores: null,
      orders: null,
      subscriptions: null,
      webhooks: null,
      lastFetch: null,
      loading: false,
      notificationEnabled: null,
      deviceInfo: null
    }
  },
  getters: {
    isAuthenticated: (state) => {
      return state.user !== null
    },
    allOrders: (state) => {
      return {
        orders: state.orders?.data?.map((order: Order) => {
          return {
            ...order,
            store: state.stores?.data?.find(
              (store: Store) => Number(store.id) == order.attributes.store_id
            )
          }
        }),
        meta: state.orders?.meta
      }
    },
    allSubscriptions: (state) => {
      return {
        subscriptions: state.subscriptions?.data?.map((order: Order) => {
          return {
            ...order,
            store: state.stores?.data?.find(
              (store: Store) => Number(store.id) == order.attributes.store_id
            )
          }
        }),
        meta: state.subscriptions?.meta
      }
    },
    allWebhooks: (state) => {
      return { webhooks: state.webhooks?.data, meta: state.webhooks?.meta }
    },
    allStores: (state) => {
      return { stores: state.stores?.data, meta: state.stores?.meta }
    }
  },
  actions: {
    async fetchDeviceInfo() {
      // @ts-ignore
      const res = await Device.getInfo()
      this.deviceInfo = res
    },
    async getLocalData() {
      const localData = await get('citrus_data')
      if (localData) {
        const data = JSON.parse(localData)
        console.log('Data fetched from local storage', data)
        return data
      }
      return false
    },
    async checkNotificationPermissions() {
      if (this.deviceInfo?.platform === 'web') {
        const { checkPermissions } = useFirebaseMessaging()
        this.notificationEnabled = await checkPermissions()
        return this.notificationEnabled
      } else {
        this.notificationEnabled = await checkNotificationPermissions()
        return this.notificationEnabled
      }
    },
    async getAllData(): Promise<boolean> {
      await this.checkNotificationPermissions()
      const localData = await this.getLocalData()
      if (localData) {
        Object.keys(localData).forEach((key) => {
          // @ts-ignore
          this[key] = localData[key]
        })
        return true
      } else {
        await remove('citrus_data')
        const modeledData = await this.refreshData()
        const modeledDataKeys = Object.keys(modeledData)
        // @ts-ignore
        if (modeledDataKeys.some((e) => modeledData[e] instanceof Error)) throw modeledData
        modeledDataKeys.forEach((key) => {
          // @ts-ignore
          this[key] = modeledData[key]
        })
        // await set('citrus_data', JSON.stringify(modeledData))
        return true
      }
    },
    async refreshData() {
      // const now = new Date()
      // const lastFetch = new Date(localData.lastFetch)
      // const diff = Math.abs(now.getTime() - lastFetch.getTime())
      // const minutes = Math.floor(diff / 1000 / 60)

      // if (minutes < 0) {
      //   return true
      // }

      const data = await Promise.all([
        this.fetchUser(),
        this.fetchStores(),
        this.fetchOrders(),
        this.fetchSubscriptions(),
        this.fetchWebhooks(),
        this.fetchDeviceInfo()
      ])
      // @ts-ignore
      const [user, stores, orders, subscriptions, webhooks] = data
      const modeledData = {
        user: user,
        stores: stores,
        orders: orders,
        subscriptions: subscriptions,
        webhooks: webhooks,
        lastFetch: new Date()
      }

      return modeledData
    },
    async fetchUser(): Promise<ApiResponse<User[]> | Error> {
      try {
        const data = await getData('users/me')
        if (!data) throw new Error('No user found or invalid api key')
        this.user = data
        return data
      } catch (error: any) {
        return error
      }
    },
    async fetchStores(): Promise<ApiResponse<Store[]> | Error> {
      try {
        const data = await getData('stores')
        if (!data) throw new Error('No stores found or invalid api key')
        this.stores = data
        return data
      } catch (error: any) {
        // @ts-ignore
        return error
      }
    },

    async fetchOrders(): Promise<ApiResponse<Order[]> | Error> {
      try {
        const data = await getData('orders?page[size]=100')
        if (!data) throw new Error('No orders found or invalid api key')
        this.orders = data
        return data
      } catch (error: any) {
        // @ts-ignore
        return error
      }
    },

    async fetchSubscriptions(): Promise<ApiResponse<Order[]> | Error> {
      try {
        const data = await getData('subscriptions')
        if (!data) throw new Error('No subscriptions found or invalid api key')
        this.subscriptions = data
        return data
      } catch (error: any) {
        return error
      }
    },
    async fetchWebhooks(): Promise<ApiResponse<Webhook[]> | Error> {
      try {
        const data = await getData('webhooks')
        if (!data) throw new Error('No webhooks found or invalid api key')
        this.webhooks = data
        return data
      } catch (error: any) {
        return error
      }
    },

    async createWebhook(payload: any, storeId: string) {
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

    async updateWebhook(id: string, payload: any, storeId: string) {
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
        if (res) showToast('Webhook deleted', 'success')
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
    },
    async startLoading() {
      this.loading = true
      return true
    },
    async stopLoading() {
      this.loading = false
      return true
    }
  }
})
