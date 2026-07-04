import React, { createContext, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  user: any | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = await SecureStore.getItemAsync('auth_token')
        if (savedToken) {
          setToken(savedToken)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) throw new Error('Login failed')

      const data = await response.json()
      await SecureStore.setItemAsync('auth_token', data.access_token)
      setToken(data.access_token)
      setIsAuthenticated(true)
      setUser({ id: data.user_id })
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('auth_token')
    } catch (error) {
      console.error('Error logging out:', error)
    }
    setToken(null)
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
