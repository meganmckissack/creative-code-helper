import { NextResponse } from 'next/server'

import { openai } from '@/lib/openai'

export async function POST(request: Request) {
  const { context } = await request.json()

  //chat completion from openai api reference
  const chat = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful writing assistant on a guide about learning HTML, CSS and Javascript. The user will deliver some written content and we will explain what this means in simple English, that is around 20 words, that an 8 year old could understand.',
      },
      //context is given from the text description of a concept
      { role: 'user', content: context },
    ],
  })

  //return message from chatgpt per api reference
  return NextResponse.json({
    message: chat.data.choices[0].message?.content ?? 'error',
  })
}
