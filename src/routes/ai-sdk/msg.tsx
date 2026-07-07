import { createFileRoute } from '@tanstack/react-router'
import { useChat } from '@ai-sdk/react'
import { useState } from 'react'
import { Button } from '@heroui/react'
import { DefaultChatTransport } from 'ai'

export const Route = createFileRoute('/ai-sdk/msg')({
  component: Chat,
})

function Chat() {
  const [input, setInput] = useState('')

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/ai-sdk/chat',
      // headers: () => ({
      //   Authorization: `Bearer ${getAuthToken()}`,
      //   'X-User-ID': getCurrentUserId(),
      // }),
      // body: () => ({
      //   sessionId: getCurrentSessionId(),
      //   preferences: getUserPreferences(),
      // }),
      // credentials: () => 'include',
    }),
  })

  console.log('messages', messages)

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage({ text: input })
          setInput('')
        }}
      >
        <div className="fixed bottom-0 w-full max-w-md">
          <input
            className="dark:bg-zinc-900 p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <Button onPress={stop}>Stop</Button>
        </div>
      </form>
    </div>
  )
}
