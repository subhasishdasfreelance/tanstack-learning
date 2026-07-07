import { createFileRoute } from '@tanstack/react-router'
import type { UIMessage } from 'ai'
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai'
import { ollama } from 'ai-sdk-ollama'

export const Route = createFileRoute('/api/ai-sdk/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages }: { messages: UIMessage[] } = await request.json()

          const result = streamText({
            model: ollama('hoangquan456/qwen3-nothink:4b'),
            system:
              'You are a helpful assistant. If user asks who are you, tell them you are a chatbot developed by Subhasish',
            messages: await convertToModelMessages(messages),
            providerOptions: {
              ollama: {
                think: false,
              },
            },
          })

          result.usage.then((usage) => {
            console.log('usage', usage)
          })

          return createUIMessageStreamResponse({
            stream: toUIMessageStream({ stream: result.stream }),
          })
        } catch (err) {
          console.log('err', err)
          return new Response('Failed to generate', { status: 500 })
        }
      },
    },
  },
})
