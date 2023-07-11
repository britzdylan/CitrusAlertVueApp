export interface Base {
  type: string
  id: string
  relationships?: {
    [key: string]: any
  }
}

export interface BaseAttributes {
  updated_at: string
  created_at: string
}

export interface OrderItem extends BaseAttributes {
  id: number
  order_id: number
  product_id: number
  variant_id: number
  product_name: string
  variant_name: string
  price: number
  test_mode: boolean
}

export interface Urls {
  receipt: string
}

export interface OrderAttributes extends BaseAttributes {
  store_id: number
  customer_id: number
  identifier: string
  order_number: number
  user_name: string
  user_email: string
  currency: string
  currency_rate: string
  subtotal: number
  discount_total: number
  tax: number
  total: number
  subtotal_usd: number
  discount_total_usd: number
  tax_usd: number
  total_usd: number
  tax_name: string
  tax_rate: string
  status: string
  status_formatted: string
  refunded: boolean
  refunded_at: null | string
  subtotal_formatted: string
  discount_total_formatted: string
  tax_formatted: string
  total_formatted: string
  first_order_item: OrderItem
  urls: Urls
}

export interface Order extends Base {
  attributes: OrderAttributes
}

export interface UserAttributes extends BaseAttributes {
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

  test_mode: boolean
}

export interface User extends Base {
  attributes: UserAttributes
}

export interface StoreAttributes extends BaseAttributes {
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

export interface Store extends Base {
  attributes: StoreAttributes
}

export interface WebhookAttributes extends BaseAttributes {
  url: string
  events: string[]
  test_mode?: boolean = false
  last_sent_at?: string
  store_id: number
}

export interface Webhook extends Base {
  attributes: WebhookAttributes
}
