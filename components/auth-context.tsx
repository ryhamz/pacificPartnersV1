'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

type User = {
  id: number
  name: string
  email: string
  age?: number
  location?: string
  bio?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (updatedUser: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const mockUser = { id: 1, name: 'John Doe', email, age: 30, location: 'Manila', bio: 'I love traveling and trying new foods!' }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const register = async (name: string, email: string, password: string) => {
    const mockUser = { id: Date.now(), name, email, age: 25, location: 'Cebu', bio: 'New to online dating. Excited to meet new people!' }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateProfile = async (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser }
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}