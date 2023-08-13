// for next.js client-side only components
'use client'

// // import styling from the css file in the folder
// // and get the bits of react we need
// import styles from './styles.module.css'
import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from 'react'

// what properties the Explain components can include
interface ExplainProps {
  children: ReactNode
}

// here's our component!
export const Explain = ({ children }: ExplainProps) => {
  // set up some states
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [output, setOutput] = useState<string | null>(null)

  // where are we storing the content
  const ref = useRef<HTMLDivElement>(null)
  const [context, setContext] = useState<string>('')

  // save the text of the content to use for our API
  useEffect(() => {
    if (ref.current) {
      setContext(ref.current.innerText)
    }
  }, [ref])

  // when a user presses the button
  const submit = async (event: MouseEvent) => {
    // stop the default thing happening (usually go to next page)
    event.preventDefault()

    // set loading to true
    setIsLoading(true)

    try {
      // HERE'S WHERE WE WILL DO THE MAIN BIT OF WORK!
      const response = await fetch('/api/explain', {
        method: 'POST',
        body: JSON.stringify({
          context: context,
        }),
      })

      const json = await response.json()

      setOutput(json.message)
    } catch (e) {
      console.error(e)
      setOutput('There was an error getting an explanation')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='relative'>
      {/* display the content */}
      <div ref={ref}>
        {children}
      </div>

      {/* the helper */}
      <div className='absolute mt-0 ml-[100%] w-[10rem] p-1.5 whitespace-normal'>
        {output ? (
          <output className='block bg-purple-500 p-1 rounded text-slate-100 w-[12rem]'>{output}</output>
        ) : isLoading ? (
          <output>Thinking&hellip;</output>
        ) : (
          <a href="#" onClick={submit}>
            More explanation
          </a>
        )}
      </div>
    </div>
  )
}
