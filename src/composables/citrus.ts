import { useCrypto } from '@/composables/crypto'
import { useStorage } from '@/composables/storage'
import { useToast } from '@/composables/toast'
import { useApi } from '@/composables/api'
import { useNotifications } from '@/composables/notifications'
import { useFirebaseMessaging } from './webMessaging'
// import { useLemonStore } from '@/stores/lemon'

export function useCitrus() {
  const { set, get } = useStorage()
  const { encrypt } = useCrypto()
  const { showToast } = useToast()
  const { getData } = useApi()

  const testKey = async (api_key: string) => {
    try {
      const encrypted = await encrypt(api_key, import.meta.env.VITE_SECRET)
      await set('api_key', encrypted)
      const { data } = await getData('users/me')
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

  const runNativeSetup = async (): Promise<void> => {
    const { registerNotifications, addListeners } = useNotifications()

    const res = await registerNotifications()
    await addListeners()
    return res
  }

  const runWebSetup = async (): Promise<string> => {
    const { requestPermissions, addListeners } = useFirebaseMessaging()

    const res: string = await requestPermissions()

    await addListeners()
    return res
  }

  return { testKey, runWebSetup, runNativeSetup }
}
