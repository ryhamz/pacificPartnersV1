'use client'

import { useState } from 'react'
import { Search, Heart, MessageCircle, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DatingSiteClone() {
  const [searchTerm, setSearchTerm] = useState('')

  const profiles = [
    { id: 1, name: "Maria Santos", age: 28, location: "Manila", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Juan dela Cruz", age: 32, location: "Cebu", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Ana Reyes", age: 25, location: "Davao", image: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Carlos Bautista", age: 30, location: "Quezon City", image: "/placeholder.svg?height=100&width=100" },
    { id: 5, name: "Isabel Gonzales", age: 27, location: "Baguio", image: "/placeholder.svg?height=100&width=100" },
    { id: 6, name: "Diego Mendoza", age: 35, location: "Iloilo", image: "/placeholder.svg?height=100&width=100" },
  ]

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-pink-600">Pacific Partners</h1>
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">Search</Button>
            <Button variant="ghost">Messages</Button>
            <Button variant="ghost">Profile</Button>
          </nav>
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Perfect Match</h2>
          <div className="flex">
            <Input
              type="text"
              placeholder="Search by name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button className="ml-2">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map(profile => (
            <div key={profile.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={profile.image} alt={profile.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{profile.name}, {profile.age}</h3>
                <p className="text-gray-600">{profile.location}</p>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2024 Pacific Partners. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}