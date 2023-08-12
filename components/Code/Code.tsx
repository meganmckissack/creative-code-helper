// this component is for turning code into
// blocks with highlighted colors

// this is for client-side components
'use client'

// using a library and a custom theme
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { theme } from './theme'

export const CodeBlock = ({ code, language }: { code: string; language: 'xml' | 'css' | 'javascript' }) => {
  return (
    <SyntaxHighlighter language={language} >
      {code}
    </SyntaxHighlighter>
  )
}
