import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { LandingComponent } from '@/components/landing-component'

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()

  return <LandingComponent id={id} />
}
