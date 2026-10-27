import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

export default function MessageDemo() {
  return (
    <MessageGroup className="w-full max-w-lg">
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Can you export the Q3 report as a PDF?</BubbleContent>
          </Bubble>
          <MessageFooter>Read 10:42</MessageFooter>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar>
          <Avatar className="size-8">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              Sure. The export includes the revenue table, the 3 charts and the
              comments. It will be ready in a few seconds.
            </BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>Do you also want the raw data as CSV?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>No, the PDF is enough.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
