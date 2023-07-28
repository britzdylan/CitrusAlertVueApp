// interfaces for the API responses

interface Meta {
  page: {
    currentPage: number
    from: number
    lastPage: number
    perPage: number
    to: number
    total: number
  }
}

interface Jsonapi {
  version: string
}

interface Links {
  first: string
  last: string
}

// base interfaces
interface Base<Type> {
  type: string
  id: string
  attributes: Type
  links: {
    self: string
  }
}

interface BaseAttributes {
  updated_at: string
  created_at: string
  test_mode: boolean
}

// interface for items

interface OrderItem extends BaseAttributes {
  order_id: number
  product_id: number
  variant_id: number
  product_name: string
  variant_name: string
  price: number
}

// attributes interfaces

export interface OrderAttributes extends BaseAttributes {
  store_id: number
  customer_id: number
  identifier: string
  order_number: number
  user_name: string
  user_email: string
  currency: string
  currency_rate: string
  tax_name: string | null
  tax_rate: string
  status: string
  status_formatted: string
  refunded: boolean
  refunded_at: null
  subtotal: number
  discount_total: number
  tax: number
  total: number
  subtotal_usd: number
  discount_total_usd: number
  tax_usd: number
  total_usd: number
  subtotal_formatted: string
  discount_total_formatted: string
  tax_formatted: string
  total_formatted: string
  first_order_item: OrderItem
  urls: {
    receipt: string
  }
}

interface UserAttributes extends BaseAttributes {
  store_id: number
  name: string
  email: string
  status: string
  city: null | string
  region: null | string
  country: string
  total_revenue_currency: number
  mrr: number
  status_formatted: string
  country_formatted: string
  total_revenue_currency_formatted: string
  mrr_formatted: string
}

interface StoreAttributes extends BaseAttributes {
  name: string
  slug: string
  domain: string
  url: string
  avatar_url: string
  plan: string
  country: string
  country_nicename: string
  currency: string
  total_sales: number
  total_revenue: number
  thirty_day_sales: number
  thirty_day_revenue: number
}

export interface WebhookAttributes extends BaseAttributes {
  url: string
  events: string[]
  last_sent_at?: string
  store_id: number
}

// custom interfaces

export interface Order extends Base<OrderAttributes> {
  store: Store
}

export interface User extends Base<UserAttributes> {}

export interface Store extends Base<StoreAttributes> {}

export interface Webhook extends Base<WebhookAttributes> {}

export interface ApiResponse<T> {
  meta: Meta
  jsonapi: Jsonapi
  links: Links
  data: T
}
