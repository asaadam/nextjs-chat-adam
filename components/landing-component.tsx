'use client'

import { useChat, type Message } from 'ai/react'
import { toast } from 'react-hot-toast'
import Textarea from 'react-textarea-autosize'

import { Button } from '@/components/ui/button'
import {
  IconArrowRightLong,
  IconChat,
  IconGallery,
  IconPlus
} from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
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
  const { isLoading, input, setInput } = useChat({
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
    <div className="flex h-screen flex-1 flex-col items-center justify-center bg-white dark:bg-[#131416]">
      <div className="flex flex-col items-center justify-center">
        <div className="px-14 sm:px-0">
          <Image
            src={'/blackbox-logo-ai.svg'}
            width={445}
            height={52}
            alt="blackbox-logo-ai"
            className="hidden dark:flex"
          />
          <Image
            src={'/blackbox-logo-ai-light.png'}
            width={445}
            height={52}
            alt="blackbox-logo-ai"
            className="flex dark:hidden"
          />
        </div>
        <p className="mt-4 text-sm font-normal text-black dark:text-white/50 sm:text-lg">
          Your AI Coding Assistant for 10X Faster, Better Coding.
        </p>
      </div>
      <div className="mx-auto px-4 sm:max-w-4xl">
        <div className="sm:max-h-58 relative mt-6 flex max-h-40 w-full grow flex-row overflow-hidden border bg-white px-8 dark:bg-black sm:mt-10 sm:rounded-md sm:px-12">
          <Popover>
            <PopoverTrigger className="absolute left-3 top-3.5 h-7 w-7 rounded border-black/10 bg-black/5 dark:border-white/10 dark:bg-background sm:left-4 sm:top-4">
              <IconPlus className="fill-outerSpace/30 w-full dark:fill-white/30" />
            </PopoverTrigger>
            <PopoverContent
              className="mb-4 ml-24 max-w-[160px] px-1 py-0"
              side="top"
            >
              <div className="flex flex-col items-start justify-start">
                <Button
                  variant="ghost"
                  className="my-1 w-full justify-start px-3"
                >
                  <IconChat className="mr-2 h-[30px] w-[30px] fill-none stroke-black dark:stroke-white" />{' '}
                  New Chat
                </Button>
                <Button
                  variant="ghost"
                  className="my-1 w-full justify-start px-3"
                >
                  <IconGallery className="mr-2 h-[30px] w-[30px] stroke-black dark:stroke-white" />
                  Attach
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Textarea
            tabIndex={0}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything or hit / for blackbox command"
            spellCheck={false}
            className="min-h-[40px] w-full resize-none border-none bg-transparent p-4 focus-within:outline-none sm:min-h-[60px] sm:py-[1.3rem] sm:text-sm"
          />
          <div className="absolute right-3 top-3.5 sm:right-4 sm:top-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading}
                  className="h-7 w-7"
                >
                  <IconArrowRightLong className="stroke-white dark:stroke-black" />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center gap-4 lg:mt-6 lg:flex-row lg:items-start">
          {chip.map((item, index) => (
            <Badge
              key={index}
              className="mt-2 w-fit cursor-pointer rounded px-4 py-2 lg:mt-0"
              variant="secondary"
              onClick={() => window.open('https://' + item.url, '_blank')}
            >
              <span className="mr-2">{item.title}</span>
            </Badge>
          ))}
        </div>
        <div className="mt-4 text-center">
          <span className="text-[10px] font-semibold text-black dark:text-white/50 sm:text-xs">
            Warning:{' '}
            <span className="text-[10px] font-normal text-black dark:text-white/50 sm:text-xs">
              Blackbox may produce inaccurate information. Make sure to verify
              its outputs.
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
