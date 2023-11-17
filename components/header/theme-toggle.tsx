'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { IconMoonFill } from '@/components/ui/icons'

type ThemeToggleType = {
  variant?: 'button' | 'icon'
}

export function ThemeToggle({ variant = 'button' }: ThemeToggleType) {
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition()

  const onClick = () => {
    startTransition(() => {
      setTheme(theme === 'light' ? 'dark' : 'light')
    })
  }

  return variant === 'button' ? (
    <Button variant="ghost" size="icon" onClick={onClick}>
      {!theme ? null : theme === 'dark' ? (
        <IconMoonFill className="transition-all" color="white" />
      ) : (
        <IconMoonFill className="transition-all" color="black" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  ) : (
    <div onClick={onClick}>
      {!theme ? null : theme === 'dark' ? (
        <IconMoonFill className="transition-all" color="white" />
      ) : (
        <IconMoonFill className="transition-all" color="black" />
      )}
    </div>
  )
}
