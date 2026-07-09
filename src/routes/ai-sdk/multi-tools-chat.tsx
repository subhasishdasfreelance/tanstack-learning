import type { ChatMessage } from '#/routes/api/ai-sdk/tools'
import { useChat } from '@ai-sdk/react'
import { Button } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { DefaultChatTransport } from 'ai'
import { useState } from 'react'

export const Route = createFileRoute('/ai-sdk/multi-tools-chat')({
  component: MultiToolsChat,
})

function MultiToolsChat() {
  const [input, setInput] = useState('')

  const { messages, sendMessage, stop } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: '/api/ai-sdk/multi-tools',
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

              case 'tool-weather':
                switch (part.state) {
                  case 'input-streaming':
                    return (
                      <div key={`${message.id}-getWeather-${i}`}>
                        <p>Receiving weather request</p>
                        <p>{JSON.stringify(part.input, null, 2)}</p>
                      </div>
                    )

                  case 'input-available':
                    return (
                      <div key={`${message.id}-getWeather-${i}`}>
                        <p>Getting weather for {part.input.city}...</p>
                      </div>
                    )

                  case 'output-available':
                    return (
                      <div key={`${message.id}-getWeather-${i}`}>
                        <p>Weather: {JSON.stringify(part.output, null, 2)}</p>
                      </div>
                    )

                  case 'output-error':
                    console.log('output error', part)
                    return (
                      <div key={`${message.id}-getWeather-${i}`}>
                        <p>Error: {part.errorText}</p>
                      </div>
                    )

                  default:
                    return null
                }

              case 'tool-location':
                switch (part.state) {
                  case 'input-streaming':
                    return (
                      <div key={`${message.id}-getLocation-${i}`}>
                        <p>Receiving location request</p>
                        <p>{JSON.stringify(part.input, null, 2)}</p>
                      </div>
                    )

                  case 'input-available':
                    return (
                      <div key={`${message.id}-getLocation-${i}`}>
                        <p>Getting location for {part.input.name}...</p>
                      </div>
                    )

                  case 'output-available':
                    return (
                      <div key={`${message.id}-getLocation-${i}`}>
                        <p>location: {JSON.stringify(part.output, null, 2)}</p>
                      </div>
                    )

                  case 'output-error':
                    console.log('output error', part)
                    return (
                      <div key={`${message.id}-getLocation-${i}`}>
                        <p>Error: {part.errorText}</p>
                      </div>
                    )

                  default:
                    return null
                }

              default:
                return null
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
