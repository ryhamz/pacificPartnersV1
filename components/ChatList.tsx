import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ChatList({ chats, activeChat, setActiveChat }) {
  return (
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
  );
}

