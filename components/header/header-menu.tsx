import { Button } from '@/components/ui/button'
import {
  IconInstagramOutline,
  IconMenu,
  IconMoon,
  IconTwitterOutline
} from '@/components/ui/icons'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar'
import Image from 'next/image'
import { ThemeToggle } from './theme-toggle'
import { TelegramButton } from './button-telegram'
import { VSCodeButton } from './button-vscode'
import { BookText } from 'lucide-react'

export async function HeaderMenu() {
  return (
    <>
      <div className="hidden items-center justify-end space-x-3 lg:flex">
        <a href="/docs">
          <Button variant="outline" className="text-xs">
            <BookText className="mr-2 h-3 w-3" />
            Docs
          </Button>
        </a>
        <TelegramButton />
        <VSCodeButton />
        <div className="hidden items-center justify-end lg:flex">
          {' '}
          <Button variant="ghost" size="icon" className="border-none">
            <IconTwitterOutline className="h-3.5 w-3.5 stroke-black dark:stroke-white" />
          </Button>
          <Button variant="ghost" size="icon" className="border-none">
            <IconInstagramOutline className="h-3.5 w-3.5 stroke-black dark:stroke-white" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 lg:hidden">
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger>
              <IconMenu className="stroke-black dark:stroke-white" />
            </MenubarTrigger>
            <MenubarContent className="mr-2">
              <MenubarItem className="py-3">
                <Image
                  src="/icon-telegram-black.svg"
                  width={16}
                  height={16}
                  alt="vscode-icon"
                  className="mr-3 flex dark:hidden"
                />
                <Image
                  src="/icon-telegram-white.svg"
                  width={16}
                  height={16}
                  alt="vscode-icon"
                  className="mr-3 hidden dark:flex"
                />
                Telegram
              </MenubarItem>
              <MenubarItem className="py-3">
                <Image
                  src="/icon-vscode.svg"
                  width={16}
                  height={16}
                  alt="vscode-icon"
                  className="mr-3 flex dark:hidden"
                />
                <Image
                  src="/icon-vscode-white.svg"
                  width={16}
                  height={16}
                  alt="vscode-icon"
                  className="mr-3 hidden dark:flex"
                />
                Install VSCode Extension
              </MenubarItem>
              <MenubarSeparator />
              <div className="flex flex-row">
                <MenubarItem className="mr-1">
                  <IconTwitterOutline className="h-4 w-4 stroke-black dark:stroke-white" />
                </MenubarItem>
                <MenubarItem className="mr-1">
                  <IconInstagramOutline className="h-4 w-4 stroke-black dark:stroke-white" />
                </MenubarItem>
                <MenubarItem>
                  <ThemeToggle variant="icon" />
                </MenubarItem>
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  )
}
