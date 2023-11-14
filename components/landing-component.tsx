'use client'

import { useChat, type Message } from 'ai/react'
import { toast } from 'react-hot-toast'
import Textarea from 'react-textarea-autosize'

import { Button } from '@/components/ui/button'
import {
  IconArrowRight,
  IconChat,
  IconGallery,
  IconNextChat,
  IconPlus
} from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import Image from 'next/image'
import { Badge } from './ui/badge'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

type Chip = {
  title: string
  url: string
}

export function LandingComponent({
  id,
  initialMessages,
  className
}: ChatProps) {
  const chip: Chip[] = [
    {
      title: 'How to delete docs from Mongodb in Python',
      url: '/'
    },
    {
      title: 'Connect to Mongodb in Nodejs',
      url: '/'
    },
    {
      title: 'Write me a simple code in Python',
      url: '/'
    }
  ]
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      }
    })
  return (
    <div className="bg-black">
      <div className="flex h-screen flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="px-14 sm:px-0">
            <Image
              src="/blackbox-logo.svg"
              width={445}
              height={52}
              alt="logo"
            />
          </div>
          <p className="mt-4 text-sm font-normal text-white text-opacity-50 sm:text-lg">
            Your AI Coding Assistant for 10X Faster, Better Coding.
          </p>
        </div>
        <div className="mx-auto px-4 sm:max-w-4xl sm:px-4">
          <div className="sm:max-h-58 relative mt-6 flex max-h-40 w-full grow flex-row overflow-hidden border bg-black px-8 sm:mt-10 sm:rounded-md sm:px-12">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-3 top-3.5 h-7 w-7 rounded border-white/10 bg-background p-0 sm:left-4 sm:top-4"
                >
                  <IconPlus className="fill-white/30" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-0">
                <div className="flex flex-col items-start justify-start">
                  <Button variant="ghost" className="w-full justify-start px-3">
                    <IconChat className="mr-2 h-[30px] w-[30px]" /> New Chat
                  </Button>
                  <Button variant="ghost" className="w-full justify-start px-3">
                    <IconGallery className="mr-2 h-[30px] w-[30px]" />
                    Attach
                  </Button>
                </div>
              </TooltipContent>
            </Tooltip>
            <Textarea
              tabIndex={0}
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything or hit / for blackbox command"
              spellCheck={false}
              className="min-h-[40px] w-full resize-none bg-transparent px-4 py-4 focus-within:outline-none sm:min-h-[60px] sm:py-[1.3rem] sm:text-sm"
            />
            <div className="absolute right-3 top-3.5 sm:right-4 sm:top-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || input === ''}
                    className="h-7 w-7"
                  >
                    <IconArrowRight />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="mt-2 flex flex-col items-center sm:flex-row sm:items-start sm:mt-6">
            {chip.map((item, index) => (
              <Badge
                key={index}
                className="mr-4 mt-2 w-fit cursor-pointer rounded px-4 py-2 sm:mt-0"
                variant="secondary"
                onClick={() => window.open('https://' + item.url, '_blank')}
              >
                <span className="mr-2">{item.title}</span>
              </Badge>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="text-[10px] font-semibold text-white text-opacity-50 sm:text-xs">
              Warning:{' '}
              <span className="text-[10px] font-normal text-white text-opacity-50 sm:text-xs">
                Blackbox may produce inaccurate information. Make sure to verify
                its outputs.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
