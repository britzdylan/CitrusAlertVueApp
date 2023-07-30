import cryptojs from 'crypto-js'
import FireUser from '@/models/user'
import type { ApiError, ApiResponse, User } from '../types'
import { useLemonStore } from '@/stores/lemon'

enum HttpStatusCode {
  // 1xx Informational
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,

  // 2xx Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,

  // 3xx Redirection
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  // 4xx Client errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  UPGRADE_REQUIRED = 426,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  // 5xx Server errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511
}

export class ApiService {
  private base_url = import.meta.env.VITE_API_URL
  private header = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }

  constructor(private decrypt: typeof cryptojs.AES.decrypt) {}

  private async getToken(endPoint: string) {
    const store = useLemonStore()
    const encryptedKey = await FireUser.getApiKey(Number(store.user?.data?.id))
    if (!encryptedKey) throw new Error('No API key found')
    const token = this.decrypt(encryptedKey, import.meta.env.VITE_SECRET)
    const url = `${this.base_url}/${endPoint}`
    return { url, token }
  }

  private async fetchFromApi<T>(
    url: string,
    options: RequestInit
  ): Promise<ApiResponse<T> | ApiError> {
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

  public async testApiKey(token: string): Promise<ApiResponse<User | null> | ApiError> {
    const response = await this.fetchFromApi<User>(`${this.base_url}/users/me`, {
      headers: { ...this.header, Authorization: `Bearer ${token}` },
      method: 'GET'
    })
    return response
  }

  public async getData<T>(endPoint: string): Promise<ApiResponse<T> | ApiError> {
    const { url, token } = await this.getToken(endPoint)
    return this.fetchFromApi(url, {
      headers: { ...this.header, Authorization: `Bearer ${token}` },
      method: 'GET'
    })
  }

  public async updateData<T>(endPoint: string, data: any): Promise<ApiResponse<T> | ApiError> {
    const { url, token } = await this.getToken(endPoint)
    return this.fetchFromApi(url, {
      method: 'PATCH',
      headers: { ...this.header, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ data: { ...data } })
    })
  }

  public async postData<T>(endPoint: string, data: any): Promise<ApiResponse<T> | ApiError> {
    const { url, token } = await this.getToken(endPoint)
    return this.fetchFromApi(url, {
      method: 'POST',
      headers: { ...this.header, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ data: { ...data } })
    })
  }

  public async deleteData(endPoint: string): Promise<ApiResponse<null> | ApiError> {
    const { url, token } = await this.getToken(endPoint)
    return this.fetchFromApi(url, {
      method: 'DELETE',
      headers: { ...this.header, Authorization: `Bearer ${token}` }
    })
  }

  public isApiResponse<T>(object: any): object is ApiResponse<T> {
    return 'meta' in object && 'jsonapi' in object && 'links' in object && 'data' in object
  }
}

// Usage:
export const apiService = new ApiService(cryptojs.AES.decrypt)
