import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
      sub: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental // will be removed in future
} = NextAuth({
  providers: [
    GitHub,
    CredentialsProvider({
      id: 'googleLogin',
      name: 'Google',
      authorize: (credentials: any) => {
        const parsedCredentials = JSON.parse(credentials.credentials)
        return {
          id: parsedCredentials.sub,
          name: parsedCredentials.name,
          email: parsedCredentials.email
        }
      }
    })
  ]
})
