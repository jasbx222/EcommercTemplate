import { apiRequest, unwrapList } from './client'
import type {
  Ad,
  Admin,
  ApiEnvelope,
  Category,
  CityOrderReport,
  City,
  Client,
  ClientStatement,
  ContactInfo,
  Courier,
  Employee,
  Filter,
  HomeSummary,
  Order,
  OrderStatus,
  PackageSize,
  Product,
  Region,
  SocialMediaLink,
  SystemParameter,
  TermsAndCondition,
  TopCustomer,
  TopSellingProduct,
} from './types'

/** Converts a plain object into FormData, handling File values and array fields (e.g. colors[], images[]). */
export function toFormData(fields: object): FormData {
  const fd = new FormData()
  Object.entries(fields as Record<string, unknown>).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    if (Array.isArray(value)) {
      if (value.length === 0) {
        fd.append(`${key}[]`, '')
      } else {
        value.forEach((item, index) => {
          fd.append(`${key}[${index}]`, item instanceof File ? item : String(item))
        })
      }
    } else if (value instanceof File) {
      fd.append(key, value)
    } else {
      fd.append(key, String(value))
    }
  })
  return fd
}

function filterQuery(filters?: Filter[], sort?: 'asc' | 'desc') {
  const query: Record<string, string | number> = {}
  filters?.forEach((filter, index) => {
    query[`filters[${index}][name]`] = filter.name
    query[`filters[${index}][operation]`] = filter.operation
    query[`filters[${index}][value]`] = filter.value
  })
  if (sort) query.sort = sort
  return query
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export const authApi = {
  // The login response shape is `{ data: <admin>, token: "..." }` — the token is a top-level
  // sibling of `data`, not nested inside it (verified directly against the live API).
  login: (email: string, password: string) =>
    apiRequest<Admin>('/admin/v1/auth/login', {
      method: 'POST',
      body: toFormData({ email, password }),
      auth: false,
    }),
  logout: () => apiRequest('/admin/v1/auth/logout', { method: 'POST' }),
}

// ---------------------------------------------------------------------------
// Ads
// ---------------------------------------------------------------------------
export const adsApi = {
  list: async (type?: 'slider' | 'banner') => {
    const res = await apiRequest<Ad[]>('/admin/v1/ads', {
      query: type ? { 'filters[0][name]': 'type', 'filters[0][operation]': '=', 'filters[0][value]': type } : undefined,
    })
    return unwrapList<Ad>(res.data)
  },
  show: (id: number | string) => apiRequest<Ad>(`/admin/v1/ads/${id}`),
  create: (fields: { title: string; image?: File; type: 'slider' | 'banner'; product_id?: number; order?: number }) =>
    apiRequest<Ad>('/admin/v1/ads', { method: 'POST', body: toFormData(fields) }),
  update: (id: number | string, fields: Partial<{ title: string; image: File; type: 'slider' | 'banner'; product_id: number; order: number }>) =>
    apiRequest<Ad>(`/admin/v1/ads/update/${id}`, { method: 'POST', body: toFormData(fields) }),
  remove: (id: number | string) => apiRequest(`/admin/v1/ads/${id}`, { method: 'DELETE' }),
}

// ---------------------------------------------------------------------------
// Category
// ---------------------------------------------------------------------------
export const categoryApi = {
  list: async (parentId?: number) => {
    const res = await apiRequest<Category[]>('/admin/v1/category', {
      query: parentId !== undefined ? { 'filters[0][name]': 'parent_id', 'filters[0][operation]': '=', 'filters[0][value]': parentId } : undefined,
    })
    return unwrapList<Category>(res.data)
  },
  show: (id: number | string) => apiRequest<Category>(`/admin/v1/category/${id}`),
  create: (fields: { name: string; image?: File; parent_id?: number }) =>
    apiRequest<Category>('/admin/v1/category', { method: 'POST', body: toFormData(fields) }),
  // NOTE: the backend's update route is /admin/v1/update/{id} (no "category" segment) — verified against the Postman collection.
  update: (id: number | string, fields: Partial<{ name: string; image: File; parent_id: number }>) =>
    apiRequest<Category>(`/admin/v1/update/${id}`, { method: 'POST', body: toFormData(fields) }),
  remove: (id: number | string) => apiRequest(`/admin/v1/category/${id}`, { method: 'DELETE' }),
}

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------
export interface ProductFields {
  name: string
  quantity: number
  description?: string
  min_size?: string
  max_size?: string
  count_in_carton?: number
  price: number
  category_id: number
  colors?: number[]
  images?: File[]
}

export const productApi = {
  list: async (categoryId?: number) => {
    const res = await apiRequest<Product[]>('/admin/v1/product', {
      query: categoryId !== undefined ? { 'filters[0][name]': 'category_id', 'filters[0][operation]': '=', 'filters[0][value]': categoryId } : undefined,
    })
    return unwrapList<Product>(res.data)
  },
  show: (id: number | string) => apiRequest<Product>(`/admin/v1/product/${id}`),
  create: (fields: ProductFields) => apiRequest<Product>('/admin/v1/product', { method: 'POST', body: toFormData(fields) }),
  update: (id: number | string, fields: Partial<ProductFields>) =>
    apiRequest<Product>(`/admin/v1/product/update/${id}`, { method: 'POST', body: toFormData(fields) }),
  remove: (id: number | string) => apiRequest(`/admin/v1/product/${id}`, { method: 'DELETE' }),
}

// ---------------------------------------------------------------------------
// Color
// ---------------------------------------------------------------------------
export const colorApi = {
  list: async () => {
    const res = await apiRequest<import('./types').Color[]>('/admin/v1/color')
    return unwrapList<import('./types').Color>(res.data)
  },
  show: (id: number | string) => apiRequest<import('./types').Color>(`/admin/v1/color/${id}`),
  // NOTE: the create route is /admin/v1/coor (typo in the backend) — verified against the Postman collection.
  create: (fields: { name: string; name_in_hexa: string }) =>
    apiRequest<import('./types').Color>('/admin/v1/coor', { method: 'POST', body: toFormData(fields) }),
  update: (id: number | string, fields: { name: string; name_in_hexa: string }) =>
    apiRequest<import('./types').Color>(`/admin/v1/color/${id}`, { method: 'PUT', body: fields }),
  remove: (id: number | string) => apiRequest(`/admin/v1/color/${id}`, { method: 'DELETE' }),
}

// ---------------------------------------------------------------------------
// Employee
// ---------------------------------------------------------------------------
export const employeeApi = {
  list: async () => {
    const res = await apiRequest<Employee[]>('/admin/v1/employee')
    return unwrapList<Employee>(res.data)
  },
  show: (id: number | string) => apiRequest<Employee>(`/admin/v1/employee/${id}`),
  create: (fields: { name: string; email: string; password: string }) =>
    apiRequest<Employee>('/admin/v1/employee', { method: 'POST', body: toFormData(fields) }),
  update: (id: number | string, fields: Partial<{ name: string; email: string; password: string }>) =>
    apiRequest<Employee>(`/admin/v1/employee/${id}`, { method: 'PUT', body: fields }),
  remove: (id: number | string) => apiRequest(`/admin/v1/employee/${id}`, { method: 'DELETE' }),
}

// ---------------------------------------------------------------------------
// Order
// ---------------------------------------------------------------------------
export const orderApi = {
  list: async (filters?: Filter[], sort?: 'asc' | 'desc') => {
    const res = await apiRequest<Order[]>('/admin/v1/order', { query: filterQuery(filters, sort) })
    return unwrapList<Order>(res.data)
  },
  updateStatus: (id: number | string, status: OrderStatus, packageSizeId?: number) =>
    apiRequest<Order>(`/admin/v1/order/update-status/${id}`, {
      method: 'PUT',
      body: { status, package_size_id: packageSizeId },
    }),
  changeDeliveryCompany: (id: number | string, deliveryCompany: 'alwaseet' | 'alnaaqil') =>
    apiRequest<Order>(`/admin/v1/order/change-delivery-company/${id}`, {
      method: 'PUT',
      body: { delivery_company: deliveryCompany },
    }),
  assignCourier: (id: number | string, courierId: number) =>
    apiRequest<Order>(`/admin/v1/order/assign-courier/${id}`, {
      method: 'POST',
      body: toFormData({ courier_id: courierId }),
    }),
  cityOrderReport: (cityId: number) =>
    apiRequest<CityOrderReport>('/admin/v1/order/city-order-report', { query: { city_id: cityId } }),
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------
export const clientApi = {
  list: async () => {
    const res = await apiRequest<Client[]>('/admin/v1/client')
    return unwrapList<Client>(res.data)
  },
  show: (id: number | string) => apiRequest<Client>(`/admin/v1/client/${id}`),
  toggleActive: (id: number | string) => apiRequest<Client>(`/admin/v1/client/toggle-active/${id}`, { method: 'PUT' }),
  toggleCanPayLater: (id: number | string) =>
    apiRequest<Client>(`/admin/v1/client/toggle-can-pay-later/${id}`, { method: 'PUT' }),
  createStatement: (id: number | string, fields: { file: File; titile: string }) =>
    apiRequest<ClientStatement>(`/admin/v1/client/create-statement/${id}`, {
      method: 'POST',
      body: toFormData(fields),
    }),
  deleteStatement: (statementId: number | string) =>
    apiRequest(`/admin/v1/client/delete-statement/${statementId}`, { method: 'DELETE' }),
}

// ---------------------------------------------------------------------------
// City / Region / Package Size
// ---------------------------------------------------------------------------
export const cityApi = {
  list: async () => {
    const res = await apiRequest<City[]>('/admin/v1/city')
    return unwrapList<City>(res.data)
  },
}

export const regionApi = {
  list: async () => {
    const res = await apiRequest<Region[]>('/admin/v1/region')
    return unwrapList<Region>(res.data)
  },
}

export const packageSizeApi = {
  list: async () => {
    const res = await apiRequest<PackageSize[]>('/admin/v1/package-size')
    return unwrapList<PackageSize>(res.data)
  },
}

// ---------------------------------------------------------------------------
// Reports
// ---------------------------------------------------------------------------
export const reportApi = {
  topSellingProducts: async () => {
    const res = await apiRequest<TopSellingProduct[]>('/admin/v1/report/top-selling-products')
    return unwrapList<TopSellingProduct>(res.data)
  },
  outOfStockProducts: async () => {
    const res = await apiRequest<Product[]>('/admin/v1/report/out-of-stock-products')
    return unwrapList<Product>(res.data)
  },
  topCustomers: async () => {
    const res = await apiRequest<TopCustomer[]>('/admin/v1/report/top-customers')
    return unwrapList<TopCustomer>(res.data)
  },
}

// ---------------------------------------------------------------------------
// Courier
// ---------------------------------------------------------------------------
export const courierApi = {
  list: async () => {
    const res = await apiRequest<Courier[]>('/admin/v1/courier')
    return unwrapList<Courier>(res.data)
  },
  show: (id: number | string) => apiRequest<Courier>(`/admin/v1/courier/${id}`),
  create: (fields: { name: string; phone: string; password: string }) =>
    apiRequest<Courier>('/admin/v1/courier', { method: 'POST', body: toFormData(fields) }),
  update: (id: number | string, fields: Partial<{ name: string; phone: string; password: string }>) =>
    apiRequest<Courier>(`/admin/v1/courier/${id}`, { method: 'PUT', body: fields }),
  remove: (id: number | string) => apiRequest(`/admin/v1/courier/${id}`, { method: 'DELETE' }),
}

// ---------------------------------------------------------------------------
// Social Media Links
// ---------------------------------------------------------------------------
export const socialMediaApi = {
  list: async () => {
    const res = await apiRequest<SocialMediaLink[]>('/admin/v1/social-media-link')
    return unwrapList<SocialMediaLink>(res.data)
  },
  show: (id: number | string) => apiRequest<SocialMediaLink>(`/admin/v1/social-media-link/${id}`),
  create: (fields: { platform: string; link: string; icon?: File }) =>
    apiRequest<SocialMediaLink>('/admin/v1/social-media-link', { method: 'POST', body: toFormData(fields) }),
  update: (id: number | string, fields: Partial<{ platform: string; link: string; icon: File }>) =>
    apiRequest<SocialMediaLink>(`/admin/v1/social-media-link/update/${id}`, { method: 'POST', body: toFormData(fields) }),
  remove: (id: number | string) => apiRequest(`/admin/v1/social-media-link/${id}`, { method: 'DELETE' }),
}

// ---------------------------------------------------------------------------
// Contact Info / Terms & Conditions
// ---------------------------------------------------------------------------
export const contactInfoApi = {
  get: async () => {
    const res = await apiRequest<ContactInfo | ContactInfo[]>('/admin/v1/contact-info')
    const list = unwrapList<ContactInfo>(res.data)
    return list[0] ?? (res.data as ContactInfo)
  },
  update: (id: number | string, whatsappLink: string) =>
    apiRequest<ContactInfo>(`/admin/v1/contact-info/${id}`, { method: 'PUT', body: { whatsappLink } }),
}

export const termsApi = {
  get: async () => {
    const res = await apiRequest<TermsAndCondition | TermsAndCondition[]>('/admin/v1/terms-and-condition')
    const list = unwrapList<TermsAndCondition>(res.data)
    return list[0] ?? (res.data as TermsAndCondition)
  },
  update: (id: number | string, fields: { title: string; content: string }) =>
    apiRequest<TermsAndCondition>(`/admin/v1/terms-and-condition/${id}`, { method: 'PUT', body: fields }),
}

// ---------------------------------------------------------------------------
// Home (dashboard summary)
// ---------------------------------------------------------------------------
export const homeApi = {
  get: () => apiRequest<HomeSummary>('/admin/v1/home'),
}

// ---------------------------------------------------------------------------
// System Parameters — note: these live under /admin/system-parameter (no "v1" segment).
// ---------------------------------------------------------------------------
export const systemParameterApi = {
  list: async () => {
    const res = await apiRequest<SystemParameter[]>('/admin/system-parameter')
    return unwrapList<SystemParameter>(res.data)
  },
  show: (id: number | string) => apiRequest<SystemParameter>(`/admin/system-parameter/${id}`),
  create: (fields: Partial<SystemParameter>) =>
    apiRequest<SystemParameter>('/admin/system-parameter', { method: 'POST', body: toFormData(fields) }),
  update: (fields: Partial<SystemParameter>) =>
    apiRequest<SystemParameter>('/admin/system-parameter', { method: 'PUT', body: fields }),
  remove: (id: number | string) => apiRequest(`/admin/system-parameter/${id}`, { method: 'DELETE' }),
}

export type { ApiEnvelope }
