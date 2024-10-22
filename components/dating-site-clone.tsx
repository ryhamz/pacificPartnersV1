'use client'

import { useState, useEffect } from 'react'
import { Search, Heart, MessageCircle, User, LogOut, Send, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AuthProvider, useAuth } from './auth-context'
import { MessageProvider, useMessage } from './message-context'
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

// ... (Keep the existing LoginForm, RegisterForm, Header, ProfileList, ChatList, ChatWindow, and MessagingTab components)

function Header() {
  const { user, logout } = useAuth()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-600">Filipino Hearts</h1>
        <nav className={`${showMobileMenu ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent z-50 md:z-auto space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0`}>
          <Button variant="ghost" onClick={() => setShowMobileMenu(false)}>Home</Button>
          <Button variant="ghost" onClick={() => setShowMobileMenu(false)}>Search</Button>
          <Button variant="ghost" onClick={() => setShowMobileMenu(false)}>Messages</Button>
          <Button variant="ghost" onClick={() => setShowMobileMenu(false)}>Profile</Button>
          {user && (
            <Button variant="ghost" onClick={() => { logout(); setShowMobileMenu(false); }}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </nav>
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <User className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

function UserProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <ProfileEditForm onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
          </div>
        )}
      </CardContent>
      {!isEditing && (
        <CardFooter>
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

function ProfileEditForm({ onCancel }: { onCancel: () => void }) {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [age, setAge] = useState(user?.age?.toString() || '')
  const [location, setLocation] = useState(user?.location || '')
  const [bio, setBio] = useState(user?.bio || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateProfile({
      name,
      age: parseInt(age),
      location,
      bio,
    })
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
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
        <Button onClick={() => setActiveTab('messages')} variant={activeTab === 'messages' ? 'default' : 'outline'} className="mr-2">
          Messages
        </Button>
        <Button onClick={() => setActiveTab('profile')} variant={activeTab === 'profile' ? 'default' : 'outline'}>
          My Profile
        </Button>
      </div>
      {activeTab === 'search' && <ProfileList />}
      {activeTab === 'messages' && <MessagingTab />}
      {activeTab === 'profile' && <UserProfile />}
    </main>
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

function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function RegisterForm() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    register(name, email, password)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Register</Button>
        </form>
      </CardContent>
    </Card>
  )
}

function ProfileList() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const profiles = [
    { id: 1, name: 'Maria Santos', age: 28, location: 'Manila', bio: 'I love exploring new places and trying local cuisines.' },
    { id: 2, name: 'Juan dela Cruz', age: 32, location: 'Cebu', bio: 'Passionate about music and outdoor activities.' },
    { id: 3, name: 'Ana Reyes', age: 25, location: 'Davao', bio: 'Aspiring photographer and nature enthusiast.' },
    // Add more profiles as needed
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map(profile => (
          <Card key={profile.id}>
            <CardHeader>
              <CardTitle>{profile.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Age: {profile.age}</p>
              <p>Location: {profile.location}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setSelectedProfile(profile)}>View Profile</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedProfile && (
        <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </>
  );
}

function ProfileModal({ profile, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{profile.name}</CardTitle>
          <CardDescription>{profile.age} years old, {profile.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{profile.bio}</p>
          {/* Add more profile details here */}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function MessagingTab() {
  const { chats, messages, sendMessage, setActiveChat, activeChat } = useMessage()
  const [newMessage, setNewMessage] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && activeChat) {
      sendMessage(activeChat, newMessage.trim())
      setNewMessage('')
    }
  }

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Chats</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {chats.map(chat => (
              <div
                key={chat.id}
                className={`p-2 cursor-pointer ${activeChat === chat.id ? 'bg-secondary' : ''}`}
                onClick={() => setActiveChat(chat.id)}
              >
                <p className="font-semibold">{chat.userName}</p>
                <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {messages.filter(m => m.senderId === activeChat || m.receiverId === activeChat).map(message => (
              <div key={message.id} className={`mb-2 ${message.senderId === activeChat ? 'text-right' : ''}`}>
                <p className="text-sm text-muted-foreground">{new Date(message.timestamp).toLocaleString()}</p>
                <p>{message.content}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow mr-2"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

export function DatingSiteClone() {
  return (
    <AuthProvider>
      <MessageProvider>
        <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
          <Header />
          <AppContent />
          <footer className="bg-white mt-12">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
              <p>&copy; 2023 Filipino Hearts. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </MessageProvider>
    </AuthProvider>
  )
}
