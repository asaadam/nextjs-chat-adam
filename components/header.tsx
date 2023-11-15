import { Button } from '@/components/ui/button'
import {
  IconInstagramOutline,
  IconMoon,
  IconTwitterOutline
} from '@/components/ui/icons'
import Image from 'next/image'

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <Image
          src="/blackbox-logo.png"
          width={152}
          height={34}
          alt="blackbox-logo"
        />
      </div>
      <div className="flex items-center justify-end space-x-2">
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
    </header>
  )
}
