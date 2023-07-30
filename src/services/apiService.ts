import type { ApiError, ApiResponse, User } from '../types'
import { HttpStatusCode } from './HttpStatusCode'
import { Preferences } from '@capacitor/preferences'
import cryptojs from 'crypto-js'
const base_url = import.meta.env.VITE_API_URL
const header = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json'
}

let userId = 0

const token = async () => {
  const encryptedKey = await Preferences.get({ key: 'API_KEY' })
  // @ts-ignore
  return cryptojs.AES.decrypt(encryptedKey.value, import.meta.env.VITE_SECRET).toString(cryptojs.enc.Utf8)
}

const url = async (id: string) => {
  return `${base_url}/${id}`
}

const fetchFromApi = async <T>(
  url: string,
  options: RequestInit
): Promise<ApiResponse<T> | ApiError> => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      switch (response.status) {
        case HttpStatusCode.UNAUTHORIZED:
          throw new Error('Invalid API key')
        case HttpStatusCode.NOT_FOUND:
          throw new Error('Endpoint not found')
        default:
          throw new Error('An error occurred while fetching data')
      }
    }

    return await response.json()
  } catch (error: any) {
    console.error('Error in fetchFromApi function: ', error)
    return {
      status: 'error',
      message: error?.message ?? 'An error occurred while fetching data'
    } as ApiError
  }
}

export const setUserId = (id: number) => {
  userId = id
}

export const testApiKey = async (token: string): Promise<ApiResponse<User | null> | ApiError> => {
  const response = await fetchFromApi<User>(`${base_url}/users/me`, {
    headers: { ...header, Authorization: `Bearer ${token}` },
    method: 'GET'
  })
  return response
}

export const getData = async <T>(endPoint: string): Promise<ApiResponse<T> | ApiError> => {
  let t = await token()
  console.log('token', t);
  return await fetchFromApi(await url(endPoint), {
    headers: {
      ...header,
      Authorization: `Bearer ${t}`
    },
    method: 'GET'
  })
}

export const updateData = async <T>(
  endPoint: string,
  data: any
): Promise<ApiResponse<T> | ApiError> => {
  return await fetchFromApi(await url(endPoint), {
    method: 'PATCH',
    headers: {
      ...header,
      Authorization: `Bearer ${await token()}`
    },
    body: JSON.stringify({ data: { ...data } })
  })
}

export const postData = async <T>(
  endPoint: string,
  data: any
): Promise<ApiResponse<T> | ApiError> => {
  return await fetchFromApi(await url(endPoint), {
    method: 'POST',
    headers: {
      ...header,
      Authorization: `Bearer ${await token()}`
    },
    body: JSON.stringify({ data: { ...data } })
  })
}

export const deleteData = async (endPoint: string): Promise<ApiResponse<null> | ApiError> => {
  return await fetchFromApi(await url(endPoint), {
    method: 'DELETE',
    headers: {
      ...header,
      Authorization: `Bearer ${await token()}`
    }
  })
}

export const isApiResponse = <T>(object: any): object is ApiResponse<T> => {
  return 'meta' in object && 'jsonapi' in object && 'links' in object && 'data' in object
}
