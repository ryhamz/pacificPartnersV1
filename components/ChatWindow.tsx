import { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ChatWindow({ messages, activeChat, sendMessage }) {
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && activeChat) {
      sendMessage(activeChat, newMessage.trim())
      setNewMessage('')
    }
  }

  return (
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
  );
}

