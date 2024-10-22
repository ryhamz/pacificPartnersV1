'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

type Message = {
  id: number
  senderId: number
  receiverId: number
  content: string
  timestamp: Date
}

type Chat = {
  id: number
  userId: number
  userName: string
  lastMessage: string
}

type MessageContextType = {
  chats: Chat[]
  messages: Message[]
  sendMessage: (receiverId: number, content: string) => void
  setActiveChat: (chatId: number) => void
  activeChat: number | null
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, userId: 2, userName: "Maria Santos", lastMessage: "Hello!" },
    { id: 2, userId: 3, userName: "Juan dela Cruz", lastMessage: "How are you?" },
  ])
  const [messages, setMessages] = useState<Message[]>([])
  const [activeChat, setActiveChat] = useState<number | null>(null)

  // Simulated WebSocket connection
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeChat) {
        const newMessage: Message = {
          id: Date.now(),
          senderId: activeChat,
          receiverId: 1, // Assuming current user's ID is 1
          content: `New message from ${chats.find(chat => chat.id === activeChat)?.userName}`,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, newMessage])
      }
    }, 5000) // Simulate receiving a new message every 5 seconds

    return () => clearInterval(interval)
  }, [activeChat, chats])

  const sendMessage = (receiverId: number, content: string) => {
    const newMessage: Message = {
      id: Date.now(),
      senderId: 1, // Assuming current user's ID is 1
      receiverId,
      content,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, newMessage])
    setChats(prev => prev.map(chat => 
      chat.userId === receiverId ? { ...chat, lastMessage: content } : chat
    ))
  }

  return (
    <MessageContext.Provider value={{ chats, messages, sendMessage, setActiveChat, activeChat }}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessage = () => {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider')
  }
  return context
}
