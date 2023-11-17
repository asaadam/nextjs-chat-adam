import { Button } from '@/components/ui/button'
import Image from 'next/image'

export async function TelegramButton() {
  return (
    <Button variant="outline" className="max-h-9 px-2 py-1">
      <Image
        src={'/icon-telegram-white.svg'}
        width={12}
        height={12}
        alt="vscode-icon"
        className="mr-2 hidden dark:flex"
      />
      <Image
        src={'/icon-telegram-black.svg'}
        width={12}
        height={12}
        alt="vscode-icon"
        className="mr-2 flex dark:hidden"
      />
      <span className="text-xs">Telegram</span>
    </Button>
  )
}
