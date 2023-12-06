'use client'

interface SnippetCreateErrorPageProps {
  error: Error,
  reset: () => void
}

export default function SnippetCreateErrorPage({error} : SnippetCreateErrorPageProps) {
  return <div>{error.message}</div>
}