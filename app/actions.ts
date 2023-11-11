'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const url = process.env.BASE_CHAT_URL + `?id=${userId}`
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    return data as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  const url = process.env.BASE_CHAT_URL + `/${id}?userId=${userId}`
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  return data as Chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth()
  const url = process.env.BASE_CHAT_URL + `/${id}`

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  const userId = session?.user?.sub || session?.user?.id

  await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({
      userId: userId
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const session = await auth()

  if (!session?.user?.sub) {
    return {
      error: 'Unauthorized'
    }
  } else {
    if (process.env.BASE_CHAT_URL) {
      await fetch(process.env.BASE_CHAT_URL, {
        method: 'DELETE',
        body: JSON.stringify({
          userId: session.user.sub
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())

      revalidatePath('/')
      return redirect('/')
    }
  }

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  } else {
    if (process.env.BASE_CHAT_URL) {
      await fetch(process.env.BASE_CHAT_URL, {
        method: 'DELETE',
        body: JSON.stringify({
          userId: session.user.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())

      revalidatePath('/')
      return redirect('/')
    }
  }
}

export async function getSharedChat(id: string) {
  const url = process.env.BASE_CHAT_URL + `/shared/${id}`
  const chat = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(chat: Chat) {
  const session = await auth()
  const url = process.env.BASE_CHAT_URL + '/share'
  const userId = session?.user?.sub || session?.user?.id

  const payload = {
    ...chat,
    chatId: chat.id,
    userId: userId
  }

  if (!session?.user?.sub) {
    return {
      error: 'Unauthorized'
    }
  } else {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  } else {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }

  return payload
}
