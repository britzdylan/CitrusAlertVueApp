import { defineStore } from 'pinia'
import { getData, postData, updateData, deleteData, isApiResponse } from '@/services/apiService'
import { useStorage } from '@/composables/storage'
import { Device } from '@capacitor/device'
import type {
  Webhook,
  Order,
  User,
  Store,
  ApiResponse,
  FireStoreUser,
  ApiError,
  Customer,
  Product
} from '@/types'

const { get, remove, set } = useStorage()
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
  user: ApiResponse<User> | null
  stores: ApiResponse<Store[]> | null
  orders: ApiResponse<Order[]> | null
  subscriptions: ApiResponse<Order[]> | null
  customers: ApiResponse<Customer[]> | null
  products: ApiResponse<Product[]> | null
  lastFetch: Date | null
  loading: boolean
  notificationEnabled: boolean | null
  deviceInfo: DeviceInfo | null
  FireStoreUser: FireStoreUser | null
}

export const useLemonStore = defineStore('Lemon', {
  state: (): State => {
    return {
      user: null,
      stores: null,
      orders: null,
      subscriptions: null,
      products: null,
      customers: null,
      lastFetch: null,
      loading: true,
      notificationEnabled: null,
      deviceInfo: null,
      FireStoreUser: null
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
    allStores: (state) => {
      return { stores: state.stores?.data, meta: state.stores?.meta }
    },
    allCustomers: (state) => {
      return { customers: state.customers?.data, meta: state.customers?.meta }
    },
    allProducts: (state) => {
      return { products: state.products?.data, meta: state.stores?.meta }
    }
  },
  actions: {
    async setupWebhooks(FireStoreUserId: number, webHooks: string[]) {
      const data = {
        url: import.meta.env.VITE_FIREBASE_WEBHOOK_URL + `?id=${FireStoreUserId}`,
        events: ['order_created', 'subscription_created'],
        secret: import.meta.env.VITE_WEBHOOK_SECRET,
        // @ts-ignore
        test_mode: process.env.NODE_ENV === 'development'
      }

      // loop through stores and create webhooks
      const stores = this.stores?.data
      if (!stores) throw new Error('No stores found')
      console.log(
        'stores & Stores Setup Started ////////////////////////////////////////////////////////////'
      )
      console.table(stores)
      console.table('Webhooks Table', webHooks)
      console.log(
        '//////////////////////////////////////////////////////////////////////////////////////////'
      )
      // find webhooks
      let allWebhooks = await Promise.all(
        webHooks.map(async (webhook) => await this.getWebHook(webhook))
      )
      console.log(
        'Fetced webhooks from API /////////////////////////////////////////////////////////////////////'
      )
      console.table(allWebhooks)
      console.log(
        '//////////////////////////////////////////////////////////////////////////////////////////'
      )

      if (allWebhooks.some((w) => w instanceof Error)) throw allWebhooks
      // @ts-ignore
      allWebhooks = allWebhooks.filter((w) => !w.status)
      // if (allWebhooks.some((w) => w.status)) {
      //   // @ts-ignore
      //   // TODO: cleanup firestore with old webhooks that are no longer needed (if any) - use the webhook id and a fbFunction
      // }

      // @ts-ignore
      if (process.env.NODE_ENV === 'development') {
        // console.log('all webhooks', allWebhooks)
      }

      if (allWebhooks.length > 0) {
        const webhooksByStoreId = allWebhooks.reduce<{ [key: string]: ApiResponse<Webhook> }>(
          (acc, webhook) => {
            // @ts-ignore
            acc[webhook.data.attributes.store_id] = webhook
            return acc
          },
          {}
        )

        let result = await Promise.all(
          stores.map((store) => {
            const webhook = webhooksByStoreId[store.id]
            if (webhook) {
              return webhook
              // return this.updateWebhook(webhook.data.id, data, store.id)
            } else {
              // handle the case where there's no webhook for a store
              return this.createWebhook(data, store.id)
            }
          })
        )
        // @ts-ignore
        return result.some((r) => r.status) ? false : result
      } else {
        let result = await Promise.all(
          stores.map(async (store) => await this.createWebhook(data, store.id))
        )
        console.log('result', result)
        // @ts-ignore
        return result.some((r) => r.status) ? false : result
      }
    },
    async getLocalData() {
      const localData = await get('citrus_data')
      if (localData) {
        const data = JSON.parse(localData)
        console.log('Data fetched from local storage', data)
        // chekc if any of the keys are null
        const keys = Object.keys(data)
        const nullKeys = keys.filter((key) => data[key] === null)
        if (nullKeys.length > 0) {
          console.log('null keys found', nullKeys)
          return false
        }
        // check if lastFetch is more than 1 day old
        const now = new Date()
        const lastFetch = new Date(data.lastFetch)
        if (Math.floor(Math.abs(now.getTime() - lastFetch.getTime()) / 1000 / 60) > 1440) {
          console.log('last fetch is more than 1 day old')
          return false
        }
        return data
      }
      return false
    },
    async getAllData(reset: boolean = false): Promise<boolean> {
      if (reset) await remove('citrus_data')
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
        console.log('Data fetched from API', modeledData)
        const modeledDataKeys = Object.keys(modeledData) as (keyof typeof modeledData)[]

        if (modeledDataKeys.some((e) => modeledData[e] instanceof Error)) {
          throw new Error('Some data is an error')
        }

        // @ts-ignore
        if (modeledDataKeys.some((e) => 'status' in modeledData[e])) {
          throw new Error('Some data not found')
        }
        modeledDataKeys.forEach((key) => {
          // @ts-ignore
          this[key] = modeledData[key]
        })
        await set('citrus_data', JSON.stringify(modeledData))
        return true
      }
    },
    async refreshData() {
      const data = await Promise.all([
        await this.fetchUser(),
        await this.fetchStores(),
        await this.fetchOrders(),
        await this.fetchSubscriptions(),
        await this.fetchCustomers(),
        await this.fetchProducts(),
        await this.fetchDeviceInfo()
      ])
      console.log('refreshData', data)
      // @ts-ignore
      const [user, stores, orders, subscriptions, customers, products] = data
      const modeledData = {
        user: user,
        stores: stores,
        orders: orders,
        subscriptions: subscriptions,
        customers: customers,
        products: products,
        lastFetch: new Date()
      }

      return modeledData
    },
    async fetchDeviceInfo() {
      // @ts-ignore
      const res = await Device.getInfo()
      this.deviceInfo = res
    },
    // USER /////////////////////////////////////////////////////////////////////////////

    async fetchUser() {
      try {
        let r = await getData<User>('users/me')
        console.log('user-store-action', r)
        return r
      } catch (error) {
        console.log('user-store-action-error', error)

        return error as ApiError
      }
    },
    // STORES /////////////////////////////////////////////////////////////////////////////

    async fetchStores() {
      try {
        return await getData<Store[]>('stores')
      } catch (error) {
        return error as ApiError
      }
    },
    // ORDERS /////////////////////////////////////////////////////////////////////////////

    async fetchOrders() {
      try {
        return await getData<Order[]>('orders?page[size]=100')
      } catch (error) {
        return error as ApiError
      }
    },
    // SUBSCRIPTIONS /////////////////////////////////////////////////////////////////////////////

    async fetchSubscriptions() {
      try {
        return await getData<Order[]>('subscriptions')
      } catch (error) {
        return error as ApiError
      }
    },
    // CUSTOEMRS /////////////////////////////////////////////////////////////////////////////
    async fetchCustomers() {
      try {
        return await getData<Customer[]>('customers')
      } catch (error) {
        return error as ApiError
      }
    },
    // PRODUCTS /////////////////////////////////////////////////////////////////////////////
    async fetchProducts() {
      try {
        return await getData<Product[]>('products')
      } catch (error) {
        return error as ApiError
      }
    },
    // WEBHOOKS /////////////////////////////////////////////////////////////////////////////

    async getWebHook(id: string) {
      try {
        return await getData<Webhook>(`webhooks/${id}`)
      } catch (error) {
        return error as ApiError
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
        return await postData<Webhook>('webhooks', webhook)
      } catch (error) {
        return error as ApiError
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
        return await postData<Webhook>('webhooks', webhook)
      } catch (error) {
        return error as ApiError
      }
    },

    async deleteWebhook(id: string) {
      try {
        return await deleteData(`webhooks/${id}`)
      } catch (error) {
        return error as ApiError
      }
    },

    // UTILITIES /////////////////////////////////////////////////////////////////////////////

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
