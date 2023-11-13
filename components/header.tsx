import * as React from 'react'

import { clearChats } from '@/app/actions'
import { ClearHistory } from '@/components/clear-history'
import { Sidebar } from '@/components/sidebar'
import { SidebarFooter } from '@/components/sidebar-footer'
import { SidebarList } from '@/components/sidebar-list'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { IconGitHub, IconSeparator, IconVercel } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { cn } from '@/lib/utils'

export async function Header() {
  const user = {
    sub: '1234567890',
    id: '1234567890',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    image: ''
  }
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <Sidebar>
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            {/* @ts-ignore */}
            <SidebarList userId={user?.sub || user?.id} />
          </React.Suspense>
          <SidebarFooter>
            <ThemeToggle />
            <ClearHistory clearChats={clearChats} />
          </SidebarFooter>
        </Sidebar>
        <div className="flex items-center">
          <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
          <UserMenu user={user} />
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="hidden ml-2 md:flex">GitHub</span>
        </a>
        <a
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          target="_blank"
          className={cn(buttonVariants())}
        >
          <IconVercel className="mr-2" />
          <span className="hidden sm:block">Deploy to Vercel</span>
          <span className="sm:hidden">Deploy</span>
        </a>
      </div>
    </header>
  )
}
