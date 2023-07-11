import { useCrypto } from '@/composables/crypto'
import { useStorage } from '@/composables/storage'
import { useToast } from '@/composables/toast'
import { useApi } from '@/composables/api'
import { useLemonStore } from '@/stores/lemon'

export function useCitrus() {
  const { set, get } = useStorage()
  const { encrypt } = useCrypto()
  const { showToast } = useToast()
  const { getData } = useApi()
  const { fetchUser, fetchStores, fetchWebhooks, createWebhook, updateWebhook } = useLemonStore()

  const testKey = async (api_key: string) => {
    try {
      const encrypted = await encrypt(api_key, import.meta.env.VITE_SECRET)
      await set('api_key', encrypted)
      const { data } = await getData('users/me')
      console.log(data)
      if (data) {
        showToast('API Key Verified', 'success')
        return true
      } else {
        throw new Error('Invalid API key')
      }
    } catch (e) {
      console.log(e)
      // @ts-ignore
      return false
    }
  }

  const enableNotifications = async () => {
    // TODO: check if notifications are enabled
    // check if notifications are enabled
    // if not, ask for permission
    // if permission granted, register with the server
    // if registration successful, update the store
    // if registration failed, show error
    // if permission denied, show error
    // if permission dismissed, show error
    return true
  }

  const setupWebhooks = async (id: string) => {
    const data = {
      url: import.meta.env.VITE_WEBHOOK_URL,
      events: ['order_created', 'subscription_created'],
      secret: import.meta.env.VITE_WEBHOOK_SECRET
    }
    // find webhooks
    const allWebhooks = await fetchWebhooks()
    // console.log(allWebhooks)
    // get all stores
    // if webhooks found, find and update the webhook
    const found = allWebhooks.find(
      (webhook: any) => webhook.attributes.url === import.meta.env.VITE_WEBHOOK_URL
    )
    console.log(found)
    // if no webhooks found, create a new webhook
    if (!found) {
      // create webhook
      return await createWebhook(data, id)
    } else {
      // update webhook
      return await updateWebhook(found.id, data, id)
    }
  }

  const runSetup = async () => {
    let res: any = await enableNotifications()
    await fetchUser()
    await fetchStores()
    // @ts-ignore
    res = await setupWebhooks(res[0].id)
    return res
  }

  return { runSetup, testKey }
}
