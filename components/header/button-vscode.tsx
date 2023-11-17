import { Button } from '@/components/ui/button'
import Image from 'next/image'

export async function VSCodeButton() {
  return (
    <Button className="max-h-9 px-2 py-1">
      <Image
        src={'/icon-vscode.svg'}
        width={12}
        height={12}
        alt="vscode-icon"
        className="mr-2 hidden dark:flex"
      />
      <Image
        src={'/icon-vscode-white.svg'}
        width={12}
        height={12}
        alt="vscode-icon"
        className="mr-2 flex dark:hidden"
      />
      <span className="text-xs">Install VSCode Extension</span>
    </Button>
  )
}
