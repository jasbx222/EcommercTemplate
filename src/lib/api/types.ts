export interface ApiEnvelope<T = unknown> {
  status?: boolean
  message?: string
  data: T
  /** Present on the login response — the bearer token lives at the top level, not nested under `data`. */
  token?: string
  errors?: Record<string, string[]>
  meta?: {
    current_page?: number
    last_page?: number
    per_page?: number
    total?: number
  }
}

export interface Filter {
  name: string
  operation: string
  value: string | number
}

export interface ListParams {
  filters?: Filter[]
  sort?: 'asc' | 'desc'
}

export interface Admin {
  id: number
  name?: string
  email: string
}

export interface Category {
  id: number
  name: string
  image?: string | null
  parent_id?: number | null
  created_at?: string
}

export interface Color {
  id: number
  name: string
  name_in_hexa: string
}

export interface ProductImage {
  id: number
  url: string
}

export interface Product {
  id: number
  name: string
  quantity: number
  description?: string | null
  min_size?: string | null
  max_size?: string | null
  count_in_carton?: number | null
  price: string | number
  category_id: number
  category?: Category
  colors?: Color[]
  images?: ProductImage[]
  created_at?: string
}

export interface Ad {
  id: number
  title: string
  image?: string | null
  type: 'slider' | 'banner'
  product_id?: number | null
  order?: number | null
}

export interface Employee {
  id: number
  name: string
  email: string
  created_at?: string
}

export type OrderStatus =
  | 'preparing'
  | 'ready_to_ship'
  | 'shipped'
  | 'partially_returned'
  | 'returned'
  | 'completed'
  | 'cancelled'

export interface OrderProduct {
  id: number
  name?: string
  quantity: number
  price?: string | number
}

export interface Order {
  id: number
  status: OrderStatus
  delivery_company?: 'alwaseet' | 'alnaaqil' | null
  package_size_id?: number | null
  courier_id?: number | null
  client_id?: number
  client?: Client
  products?: OrderProduct[]
  total?: string | number
  created_at?: string
}

export interface ClientStatement {
  id: number
  title: string
  file: string
}

export interface Client {
  id: number
  name: string
  phone: string
  city_id?: number
  is_active?: boolean
  can_pay_later?: boolean
  statements?: ClientStatement[]
  created_at?: string
}

export interface City {
  id: number
  name: string
}

export interface Region {
  id: number
  name: string
  city_id: number
}

export interface PackageSize {
  id: number
  name: string
}

export interface Courier {
  id: number
  name: string
  phone: string
}

export interface SocialMediaLink {
  id: number
  platform: string
  link: string
  icon?: string | null
}

export interface ContactInfo {
  id: number
  whatsappLink: string
}

export interface TermsAndCondition {
  id: number
  title: string
  content: string
}

export interface SystemParameter {
  id: number
  main_app_version?: string
  app_android_link?: string
  app_android_direct_link?: string
  app_ios_link?: string
  ios_test?: string | number
  main_app_version_ios?: string
}

export interface TopSellingProduct {
  product_id: number
  total_sold: string
  product: { id: number; name: string; price: string }
}

export interface HomeCounts {
  orders: number
  clients: number
  products: number
}

/** Shape verified against the live API: `{ counts: {...}, top_clients: [...] }`. */
export interface HomeSummary {
  counts: HomeCounts
  top_clients: Client[]
}

export interface TopCustomer {
  client_id: number
  client?: Client
  total_orders?: number
  total_spent?: string | number
}

export interface CityOrderReport {
  city_id: number
  total_orders?: number
  [key: string]: unknown
}
