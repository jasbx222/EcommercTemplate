import type { ApiEnvelope } from './types'

const BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '')
const TOKEN_KEY = 'madar_admin_token'

export class ApiError extends Error {
  status: number
  errors?: Record<string, string[]>
  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(TOKEN_KEY)
}

let unauthorizedHandler: (() => void) | null = null
export function setUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler
}

type RequestBody = FormData | Record<string, unknown> | undefined

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: RequestBody
  query?: Record<string, string | number | boolean | undefined>
  auth?: boolean
}

function buildQueryString(query?: RequestOptions['query']) {
  if (!query) return ''
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== '') params.append(key, String(value))
  })
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestOptions = {}
): Promise<ApiEnvelope<T>> {
  const { method = 'GET', body, query, auth = true } = options
  const url = `${BASE_URL}${path}${buildQueryString(query)}`
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData

  const headers: Record<string, string> = { Accept: 'application/json' }
  if (body && !isFormData) headers['Content-Type'] = 'application/json'
  if (auth) {
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  }

  let response: Response
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined,
      cache: 'no-store',
    })
  } catch {
    throw new ApiError('تعذر الاتصال بالخادم، تحقق من اتصالك بالإنترنت', 0)
  }

  const contentType = response.headers.get('content-type') ?? ''
  const json = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : null

  if (response.status === 401) {
    clearToken()
    unauthorizedHandler?.()
    throw new ApiError(json?.message ?? 'انتهت الجلسة، الرجاء تسجيل الدخول مرة أخرى', 401)
  }

  if (!response.ok || json?.status === false) {
    throw new ApiError(
      json?.message ?? 'حدث خطأ غير متوقع أثناء الاتصال بالخادم',
      response.status,
      json?.errors
    )
  }

  return (json ?? { data: null }) as ApiEnvelope<T>
}

/** Laravel-style paginated/plain list responses come back in a few shapes; normalize to an array. */
export function unwrapList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[]
  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>
    if (Array.isArray(obj.data)) return obj.data as T[]
    if (obj.data && typeof obj.data === 'object') return unwrapList<T>(obj.data)
  }
  return []
}
