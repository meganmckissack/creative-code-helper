import { CodeBlock } from '@/components/Code'
import { Explain } from '@/components/Explain'
import { AskQuestion } from '@/components/AskQuestion'

const code1 = `p {
  if (condition) {
    // code to be executed if condition is true
  } else {
    // code to be executed if condition is false
  }
}`

export default function Home() {
  return (
    <article className="container mx-auto py-8">
        <h1 className='py-2'>Conditionals</h1>
        <Explain>
          <p className='py-2'>
          Conditional statements in P5.js allow you to execute different blocks of code 
          based on whether a certain condition is true or false. A commonly used conditional statement is the if statement
          </p>
        </Explain>

        <CodeBlock language="javascript" code={code1} />

        <AskQuestion>

        </AskQuestion>

    </article>
  )
}
