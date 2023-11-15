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

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4 backdrop-blur-xl dark:bg-black">
      <div className="flex items-center">
        <Image
          src="/blackbox-logo.png"
          width={152}
          height={34}
          alt="blackbox-logo"
        />
      </div>
      <div className="hidden items-center justify-end space-x-2 lg:flex">
        <Button variant="outline" className="max-h-9 px-2 py-1">
          <Image
            src="/icon-telegram.svg"
            width={12}
            height={12}
            alt="vscode-icon"
            className="mr-2"
          />{' '}
          <span className="text-xs">Telegram</span>
        </Button>
        <Button className="max-h-9 px-2 py-1">
          <Image
            src="/icon-vscode.svg"
            width={12}
            height={12}
            alt="vscode-icon"
            className="mr-2"
          />{' '}
          <span className="text-xs">Install VSCode Extension</span>
        </Button>
        <Button variant="ghost" size="icon" className="border-none">
          <IconTwitterOutline className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="border-none">
          <IconInstagramOutline className="h-3.5 w-3.5" />
        </Button>
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-end space-x-2 lg:hidden">
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger>
              <IconMenu />
            </MenubarTrigger>
            <MenubarContent className="mr-2">
              <MenubarItem className="py-3">
                <Image
                  src="/icon-telegram.svg"
                  width={16}
                  height={16}
                  alt="vscode-icon"
                  className="mr-3"
                />{' '}
                Telegram
              </MenubarItem>
              <MenubarItem className="py-3">
                <Image
                  src="/icon-vscode-white.svg"
                  width={16}
                  height={16}
                  alt="vscode-icon"
                  className="mr-3"
                />{' '}
                Install VSCode Extension
              </MenubarItem>
              <MenubarSeparator />
              <div className="flex flex-row">
                <MenubarItem>
                  <IconTwitterOutline className="mr-2 h-4 w-4" />
                </MenubarItem>
                <MenubarItem>
                  <IconInstagramOutline className="mr-2 h-4 w-4" />
                </MenubarItem>
                <MenubarItem>
                  <IconMoon className="h-4 w-4" />
                </MenubarItem>
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  )
}
