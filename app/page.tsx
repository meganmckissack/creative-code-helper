import { CodeBlock } from '@/components/Code'
import { Explain } from '@/components/Explain'

const code1 = `p {
  if (condition) {
    // code to be executed if condition is true
  } else {
    // code to be executed if condition is false
  }
}`

export default function Home() {
  return (
    <article>
        <h1>Conditionals</h1>
        <Explain>
          <p>
          Conditional statements in P5.js allow you to execute different blocks of code 
          based on whether a certain condition is true or false. A commonly used conditional statement is the if statement
          </p>
        </Explain>

        <CodeBlock language="javascript" code={code1} />

    </article>
  )
}
