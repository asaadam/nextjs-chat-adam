// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'
import { Separator } from './ui/separator'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export interface ChatMessageProps {
  message: Message
}

type Chip = {
  title: string
  type: 'google' | 'yahoo' | 'facebook'
  url: string
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const chip: Chip[] = [
    {
      title: 'Some article Title',
      type: 'google',
      url: 'google.com'
    },
    {
      title: 'title Yahoo article',
      type: 'yahoo',
      url: 'yahoo.com'
    },
    {
      title: 'Facebook Title Article',
      type: 'facebook',
      url: 'facebook.com'
    }
  ]

  const imageConverter = (type: 'google' | 'yahoo' | 'facebook') => {
    switch (type) {
      case 'google':
        return '/icon-google.svg'
      case 'yahoo':
        return '/icon-yahoo.svg'
      case 'facebook':
        return '/icon-facebook.svg'
      default:
        return ''
    }
  }

  return (
    <div>
      <div
        className={cn('group relative mb-4 flex items-start md:-ml-12')}
        {...props}
      >
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
            message.role === 'user'
              ? 'bg-background'
              : 'bg-primary text-primary-foreground'
          )}
        >
          {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
        </div>
        <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
          <MemoizedReactMarkdown
            className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] == '▍') {
                    return (
                      <span className="mt-1 animate-pulse cursor-default">
                        ▍
                      </span>
                    )
                  }

                  children[0] = (children[0] as string).replace('`▍`', '▍')
                }

                const match = /language-(\w+)/.exec(className || '')

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ''}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                )
              }
            }}
          >
            {message.content}
          </MemoizedReactMarkdown>
          <ChatMessageActions message={message} />
        </div>
      </div>
      {message.role !== 'user' && (
        <div>
          <Separator className="my-4" />
          <div className="flex flex-col items-center md:flex-row ">
            <p className="text-xs mr-2 ">See Web Results:</p>
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              {chip.map((item, index) => (
                <Badge
                  key={index}
                  className="m-1 w-fit cursor-pointer "
                  onClick={() => window.open('https://' + item.url, '_blank')}
                >
                  <Image
                    width={16}
                    height={16}
                    src={imageConverter(item.type)}
                    alt={item.url}
                    className="mr-2"
                  />
                  <span className="mr-2">{item.title}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
