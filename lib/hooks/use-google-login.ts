'use client'

async function verify(token: string) {
  const url = process.env.NEXT_PUBLIC_BASE_AUTH_URL + '/google/verify'
  const verify = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  }).then(res => {
    return res.json()
  })

  if (!verify) {
    console.log('verification failed')
  }

  return verify
}

import { useState } from 'react'
import { useSession, signIn, SignInOptions } from 'next-auth/react'

interface OneTapSigninOptions {
  parentContainerId?: string
}

const useOneTapSignin = (
  options?: OneTapSigninOptions &
    Pick<SignInOptions, 'redirect' | 'callbackUrl'>
) => {
  const { parentContainerId } = options || {}
  const [isLoading, setIsLoading] = useState(false)
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      if (!isLoading) {
        const { google } = window as unknown as any
        if (google) {
          google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: async (response: any) => {
              setIsLoading(true)
              const verifiedResponse = await verify(response.credential)
              await signIn('googleLogin', {
                credentials: JSON.stringify(verifiedResponse)
              })
              setIsLoading(false)
            },
            prompt_parent_id: parentContainerId
          })

          google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed()) {
              console.log(
                'getNotDisplayedReason ::',
                notification.getNotDisplayedReason()
              )
            } else if (notification.isSkippedMoment()) {
              console.log(
                'getSkippedReason  ::',
                notification.getSkippedReason()
              )
            } else if (notification.isDismissedMoment()) {
              console.log(
                'getDismissedReason ::',
                notification.getDismissedReason()
              )
            }
          })
        }
      }
    }
  })

  return { isLoading }
}

export default useOneTapSignin
