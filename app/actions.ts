'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { type Chat } from '@/lib/types'

export async function getChats(userId?: string | null) {
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
  const url = process.env.BASE_CHAT_URL + `/${id}`
  const userId = '1234567890'

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
  if (process.env.BASE_CHAT_URL) {
    await fetch(process.env.BASE_CHAT_URL, {
      method: 'DELETE',
      body: JSON.stringify({
        userId: '1234567890'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    revalidatePath('/')
    return redirect('/')
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
  const url = process.env.BASE_CHAT_URL + '/share'
  const userId = '1234567890'

  const payload = {
    ...chat,
    chatId: chat.id,
    userId: userId
  }

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

  return payload
}
