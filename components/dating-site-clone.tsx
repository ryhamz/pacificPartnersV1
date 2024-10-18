'use client'

import { useState } from 'react'
import { Search, Heart, MessageCircle, User, LogOut, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthProvider, useAuth } from './auth-context'
import { MessageProvider, useMessage } from './message-context'
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

// ... (Keep the existing LoginForm, RegisterForm, and profiles array)

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

// ... (Keep the existing ProfileList and UserProfile components)

function ChatList() {
  const { chats, setActiveChat, activeChat } = useMessage()

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Chats</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`p-2 cursor-pointer ${activeChat === chat.id ? 'bg-muted' : ''}`}
              onClick={() => setActiveChat(chat.id)}
            >
              <h3 className="font-semibold">{chat.userName}</h3>
              <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function ChatWindow() {
  const { messages, sendMessage, activeChat, chats } = useMessage()
  const [newMessage, setNewMessage] = useState('')

  const activeChatMessages = messages.filter(
    msg => msg.senderId === activeChat || msg.receiverId === activeChat
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && activeChat) {
      sendMessage(activeChat, newMessage.trim())
      setNewMessage('')
    }
  }

  if (!activeChat) {
    return (
      <Card className="h-[400px] flex items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">Select a chat to start messaging</p>
        </CardContent>
      </Card>
    )
  }

  const chatPartner = chats.find(chat => chat.id === activeChat)

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>{chatPartner?.userName}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <ScrollArea className="h-[250px]">
          {activeChatMessages.map(msg => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded-lg ${
                msg.senderId === activeChat ? 'bg-muted text-left' : 'bg-primary text-primary-foreground text-right'
              }`}
            >
              {msg.content}
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
            className="flex-grow"
          />
          <Button type="submit" className="ml-2">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

function MessagingTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChatList />
      <ChatWindow />
    </div>
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