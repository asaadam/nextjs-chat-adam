import { HeaderLogo } from './header-logo'
import { HeaderMenu } from './header-menu'

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4 backdrop-blur-xl dark:bg-black">
      <HeaderLogo />
      <HeaderMenu />
    </header>
  )
}
