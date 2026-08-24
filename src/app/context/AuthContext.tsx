'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '@/lib/api/resources'
import { ApiError } from '@/lib/api/client'
import { clearToken, getToken, setToken, setUnauthorizedHandler } from '@/lib/api/client'
import type { Admin } from '@/lib/api/types'

interface AuthContextValue {
  admin: Admin | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsAuthenticated(Boolean(getToken()))
    setIsLoading(false)

    setUnauthorizedHandler(() => {
      setAdmin(null)
      setIsAuthenticated(false)
    })
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password)
    if (!res.token) {
      throw new ApiError('استجابة غير متوقعة من الخادم', 500)
    }
    setToken(res.token)
    setAdmin(res.data ?? null)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // best-effort: clear the local session even if the server call fails
    } finally {
      clearToken()
      setAdmin(null)
      setIsAuthenticated(false)
    }
  }, [])

  const value = useMemo(
    () => ({ admin, isAuthenticated, isLoading, login, logout }),
    [admin, isAuthenticated, isLoading, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
