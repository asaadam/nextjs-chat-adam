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

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <Image
          src="/blackbox-logo.png"
          width={152}
          height={34}
          alt="blackbox-logo"
        />
      </div>
      <div className="hidden items-center justify-end space-x-2 lg:flex">
        <Button variant="outline">
          <Image
            src="/icon-telegram.svg"
            width={12}
            height={12}
            alt="vscode-icon"
            className="mr-2"
          />{' '}
          Telegram
        </Button>
        <Button>
          <Image
            src="/icon-vscode.svg"
            width={12}
            height={12}
            alt="vscode-icon"
            className="mr-2"
          />{' '}
          Install VSCode Extension
        </Button>
        <Button variant="outline" size="icon" className="border-none">
          <IconTwitterOutline className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline" size="icon" className="border-none">
          <IconInstagramOutline className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline" size="icon" className="border-none">
          <IconMoon className="h-3.5 w-3.5" />
        </Button>
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
              <MenubarItem>
                <IconTwitterOutline className="mr-2 h-4 w-4" />
                <IconInstagramOutline className="mr-2 h-4 w-4" />
                <IconMoon className="h-4 w-4" />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  )
}
