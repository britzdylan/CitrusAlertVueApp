export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  variant_id: number
  product_name: string
  variant_name: string
  price: number
  created_at: string
  updated_at: string
  test_mode: boolean
}

export interface Urls {
  receipt: string
}

export interface OrderAttributes {
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
  created_at: string
  updated_at: string
}

export interface Order {
  type: string
  id: string
  attributes: OrderAttributes
}

export interface CustomerAttributes {
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
  created_at: string
  updated_at: string
  test_mode: boolean
}

export interface Customer {
  type: string
  id: string
  attributes: CustomerAttributes
}

export interface StoreAttributes {
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
  created_at: string
  updated_at: string
}

export interface Store {
  type: string
  id: string
  attributes: StoreAttributes
}

export interface WebhookAttributes {
  url?: string
  events?: string[]
  secret?: string
}
