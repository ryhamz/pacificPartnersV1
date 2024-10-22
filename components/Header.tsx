'use client'

import { useState } from 'react'
import { LogOut, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from './auth-context'
import { useSearch } from './search-context'

export function Header() {
  const { user, logout } = useAuth()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { setSearchTerm: setGlobalSearchTerm } = useSearch()

  const handleSearch = () => {
    setGlobalSearchTerm(searchTerm)
  }

  return (
    // ... (rest of the Header component code)
  )
}

