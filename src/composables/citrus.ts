import { useCrypto } from '@/composables/crypto'
import { useStorage } from '@/composables/storage'
import { useToast } from '@/composables/toast'

export function useCitrus() {
  const { set } = useStorage()
  const { encrypt } = useCrypto()
  const { showToast } = useToast()

  const runSetup = async (api_key: string) => {
    // 1. Test API key
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
      // @ts-ignore
      return e
    }
    // 2. run store setup
  }

  return { runSetup }
}
