import { tools } from '#/shared/aiSdk/tools'
import { createFileRoute } from '@tanstack/react-router'
import type { InferUITools, UIDataTypes, UIMessage } from 'ai'
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
} from 'ai'
import { ollama } from 'ai-sdk-ollama'

export type ChatTools = InferUITools<typeof tools>
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>

export const Route = createFileRoute('/api/ai-sdk/tools')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages }: { messages: ChatMessage[] } = await request.json()

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
            tools,
            stopWhen: stepCountIs(2),
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
