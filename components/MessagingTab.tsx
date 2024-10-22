import { useState, useEffect } from 'react'
import { useMessage } from './message-context'
import { ChatList } from './ChatList'
import { ChatWindow } from './ChatWindow'

export function MessagingTab() {
  const { chats, messages, sendMessage, setActiveChat, activeChat } = useMessage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ChatList chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} />
      <ChatWindow
        messages={messages}
        activeChat={activeChat}
        sendMessage={sendMessage}
      />
    </div>
  );
}

