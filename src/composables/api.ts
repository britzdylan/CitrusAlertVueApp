import { useStorage } from 'storage'
import { useCrypto } from 'crypto'
export async function useApi() {
  const { get } = useStorage()
  const { decrypt } = useCrypto()

  const base_url = import.meta.env.VITE_API_URL
  const header = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
  // use fetch to get data from the API
  const get = async (endPoint: string) => {
    const encryptedKey = await get('api_key')
    const token = await decrypt(encryptedKey, 'secret')
    const url = `${base_url}/${endPoint}`

    const response = await fetch(url, {
      headers: { ...header, Authorization: `Bearer ${token}` }
    })
    return await response.json()
  }

  // use fetch to post data to the API
  const post = async (endPoint: string, data: any) => {
    const encryptedKey = await get('api_key')
    const token = await decrypt(encryptedKey, 'secret')
    const url = `${base_url}/${endPoint}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { ...header, Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    })
    return await response.json()
  }

  return { get, post }
}
