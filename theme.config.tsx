import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Blackbox Documentation</span>,
  project: {
    link: 'https://github.com/shuding/nextra-docs-template'
  },
  chat: {
    link: 'https://discord.com'
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Nextra Docs Template'
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark'
  }
}

export default config
