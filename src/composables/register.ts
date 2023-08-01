import { useToast } from '@/composables/toast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCrypto } from '@/composables/crypto'
import { testApiKey } from '@/services/apiService'
import { useStorage } from '@/composables/storage'
import { useFireUser } from '@/composables/fireUser'

export function useRegister() {
  const { encrypt } = useCrypto()
  const router = useRouter()
  const { showToast } = useToast()
  const storage = useStorage()
  // TODO fix this
  const api_key = ref(import.meta.env.VITE_API_KEY || '')
  const error = ref(false)
  const loading = ref(false)

  const testKey = async (api_key: string) => {
    try {
      const data = await testApiKey(api_key)
      if (data) {
        showToast('API Key Verified', 'success')
      } else {
        throw new Error('Invalid API key')
      }
      let enc = await encrypt(api_key, import.meta.env.VITE_SECRET)
      await storage.set('API_KEY', enc)
      return true
    } catch (e) {
      console.log(e)
      // @ts-ignore
      return false
    }
  }

  const register = async () => {
    loading.value = true
    if (!api_key.value || api_key.value.length < 36) {
      showToast('Please enter a valid API key', 'error')
      error.value = true
      loading.value = false
      return
    }
    let result = await testKey(api_key.value)
    if (result) {
      setTimeout(() => {
        router.replace('/dashboard')
      }, 1000)
    } else {
      error.value = true
      loading.value = false
      showToast('Invalid API key please try again', 'error')
    }
  }

  return { register, api_key, error, loading }
}
