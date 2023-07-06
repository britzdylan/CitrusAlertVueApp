import { useStorage } from './storage'
import { useCrypto } from './crypto'
export function useApi() {
  const { get } = useStorage()
  const { decrypt } = useCrypto()

  const base_url = import.meta.env.VITE_API_URL
  const header = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
  // use fetch to get data from the API
  const getData = async (endPoint: string): Promise<any> => {
    // @ts-ignore
    const encryptedKey = await get('api_key')
    if (!encryptedKey) throw new Error('No API key found')
    const token = await decrypt(encryptedKey, import.meta.env.VITE_SECRET)
    const url = `${base_url}/${endPoint}`

    const response = await fetch(url, {
      headers: { ...header, Authorization: `Bearer ${token}` }
    })
    return await response.json()
  }

  return { getData }
}
