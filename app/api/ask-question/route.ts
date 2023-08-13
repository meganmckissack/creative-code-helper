import { NextResponse } from 'next/server'

import { openai } from '@/lib/openai'

export async function POST(request: Request) {
  const { context, messages } = await request.json()

  const chat = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant for a guide on learning HTML, CSS, Javascript, and p5.js. The user may ask a question which could be related to the following section of content which is delivered as HTML and will include code snippets. Your answer should be concise and be no more than 100 words. The answer must be delivered in a Markdown format. The context of the question is to do with... ' +
          context,
      },
      ...messages,
    ],
  })

  const answer = chat.data.choices[0].message?.content ?? 'Could not understand question'

  return NextResponse.json({ message: answer })
}