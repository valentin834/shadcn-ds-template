"use client"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

// Static conversation: the official example streams replies from an AI
// backend, this one only shows the layout (scroll area + scroll-to-bottom).
const messages = Array.from({ length: 12 }, (_, i) => ({
  id: `m${i}`,
  role: i % 2 === 0 ? "user" : "assistant",
  text:
    i % 2 === 0
      ? `Question ${i / 2 + 1}: can you summarise the open tickets?`
      : "There are 14 open tickets: 6 bugs, 5 feature requests and 3 support questions. The oldest one has been open for 9 days.",
}))

export default function MessageScrollerDemo() {
  return (
    <Card className="h-120 w-full max-w-lg">
      <CardHeader>
        <CardTitle>Assistant</CardTitle>
        <CardDescription>Scroll up to show the scroll-to-bottom button.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-(--card-spacing)">
                {messages.map((message) => (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor={message.role === "user"}
                  >
                    <Message align={message.role === "user" ? "end" : "start"}>
                      <MessageContent>
                        <Bubble variant={message.role === "user" ? "default" : "muted"}>
                          <BubbleContent>{message.text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>
    </Card>
  )
}
