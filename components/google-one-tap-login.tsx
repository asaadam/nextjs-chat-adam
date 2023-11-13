'use client'

import useOneTapSignin from '@/lib/hooks/use-google-login'
import { IconSpinner } from './ui/icons'

const GoogleOneTapLogin = () => {
  const { isLoading: oneTapIsLoading } = useOneTapSignin({
    redirect: false,
    parentContainerId: 'oneTap'
  })

  return oneTapIsLoading ? (
    <IconSpinner />
  ) : (
    <div id="oneTap" className="fixed top-0 right-0 z-[100]" />
  )
}

export default GoogleOneTapLogin
