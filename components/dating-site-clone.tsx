'use client'

import { useState } from 'react'
import { Search, Heart, MessageCircle, User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthProvider, useAuth } from './auth-context'
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const profiles = [
  { id: 1, name: "Maria Santos", age: 28, location: "Manila", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Juan dela Cruz", age: 32, location: "Cebu", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Ana Reyes", age: 25, location: "Davao", image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Carlos Bautista", age: 30, location: "Quezon City", image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Isabel Gonzales", age: 27, location: "Baguio", image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Diego Mendoza", age: 35, location: "Iloilo", image: "/placeholder.svg?height=100&width=100" },
]

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    register(name, email, password)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account to start finding matches</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-600">Filipino Hearts</h1>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Search</Button>
          <Button variant="ghost">Messages</Button>
          <Button variant="ghost">Profile</Button>
          {user && (
            <Button variant="ghost" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </nav>
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

function ProfileList() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
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
    </>
  )
}

function UserProfile() {
  const { user } = useAuth()

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Edit Profile</Button>
      </CardFooter>
    </Card>
  )
}

function AuthenticatedApp() {
  const [activeTab, setActiveTab] = useState('search')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button onClick={() => setActiveTab('search')} variant={activeTab === 'search' ? 'default' : 'outline'} className="mr-2">
          Search Profiles
        </Button>
        <Button onClick={() => setActiveTab('profile')} variant={activeTab === 'profile' ? 'default' : 'outline'}>
          My Profile
        </Button>
      </div>
      {activeTab === 'search' ? <ProfileList /> : <UserProfile />}
    </main>
  )
}

export function DatingSiteClone() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <Header />
        <AppContent />
        <footer className="bg-white mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            <p>&copy; 2023 Filipino Hearts. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  )
}

function AppContent() {
  const { user } = useAuth()

  if (!user) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LoginForm />
          <RegisterForm />
        </div>
      </main>
    )
  }

  return <AuthenticatedApp />
}