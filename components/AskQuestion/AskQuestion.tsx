// this is for client-side components
'use client'


import { type ReactNode, useEffect, useRef, useState, FormEvent } from 'react'
import ReactMarkdown from 'react-markdown'

// what props can be added into this component?
interface AskQuestionProps {
  children: ReactNode
}

// what does a chat message contain?
interface ChatMessage {
  role: 'user' | 'assistant' // only two states
  content: string
}

export const AskQuestion = ({ children }: AskQuestionProps) => {
  // what is the question the user is asking?
  const [question, setQuestion] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // currently an array with no messages
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // for use in sending context about conversation
  const ref = useRef<HTMLDivElement>(null)
  const [context, setContext] = useState<string>('')

  // update the context when we have info passed in
  useEffect(() => {
    if (ref.current) {
      setContext(ref.current.innerHTML)
    }
  }, [ref])

  // when the form is submitted
  const submit = async (event: FormEvent) => {
    // stop doing the default thing a form does (go to next page)
    event.preventDefault()

    // if there is a question
    if (question.trim() !== '') {
      // is loading and question box empties
      setIsLoading(true)
      setQuestion('')

      // update chat messages so new user question at end of array
      const updatedMessages: ChatMessage[] = [
        ...messages,
        {
          role: 'user',
          content: question,
        },
      ]

      // update state
      setMessages(updatedMessages)

      try {
        // we are actually not smart
        // THIS IS WHERE WE WILL DO THE WORK
        const response = await fetch('/api/ask-question', {
          method: 'POST',
          body: JSON.stringify({
            context: context,
            messages: updatedMessages,
          }),
        })

        const json = await response.json()

        setMessages([
          ...updatedMessages,
          {
            role: 'assistant',
            content: json.message,
          },
        ])
      } catch (e) {
        console.error(e)

        setMessages([
          ...updatedMessages,
          { role: 'assistant', content: 'There was an error getting an explanation' },
        ])
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div>
      <div ref={ref}>
        {children}
      </div>

      <div className={'panel '}>
        <div className="title">
          <h3>Ask Eliza</h3>
          <p>
            Got a question? Ask Eliza a question and they will try to help you out!
          </p>
        </div>

        <div>
          {messages.map((message, index) => {
            return (
              <output key={index}>
                <strong>{message.role === 'assistant' ? 'Eliza' : 'You'}</strong>
                <div>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </output>
            )
          })}

          {isLoading && (
            <output>
              <strong>Eliza:</strong>
              <div>
                <ReactMarkdown>Thinking...</ReactMarkdown>
              </div>
            </output>
          )}
        </div>

        <form onSubmit={submit}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. what is a margin?"
          />
          <button type="submit" disabled={isLoading}>
            Ask
          </button>
        </form>
      </div>
    </div>
  )
}
