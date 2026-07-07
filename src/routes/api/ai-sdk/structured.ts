import { valibotSchema } from '@ai-sdk/valibot'
import { createFileRoute } from '@tanstack/react-router'
import { createTextStreamResponse, Output, streamText, toTextStream } from 'ai'
import { ollama } from 'ai-sdk-ollama'
import * as v from 'valibot'

export const PersonSchema = v.object({
  name: v.string(),
  age: v.number(),
  hobbies: v.array(v.string()),
})

export type Person = v.InferOutput<typeof PersonSchema>

export const Route = createFileRoute('/api/ai-sdk/structured')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { text } = await request.json()
          // is we want to send non streaming response
          //         const result = await generateText({
          //           model: ollama('hoangquan456/qwen3-nothink:4b'),

          //           prompt: `
          // Extract the person.
          // ${text}
          // `,
          //           output: Output.object({ schema: valibotSchema(PersonSchema) }),
          //         })

          //         return Response.json(result)

          const result = streamText({
            model: ollama('hoangquan456/qwen3-nothink:4b'),
            prompt: `
              Extract the person.

              ${text}
              `,
            output: Output.object({ schema: valibotSchema(PersonSchema) }),
            providerOptions: {
              ollama: {
                think: false,
              },
            },
          })

          return createTextStreamResponse({
            stream: toTextStream({ stream: result.stream }),
          })
        } catch (err) {
          console.log('err', err)
          return new Response('Failed to generate', { status: 500 })
        }
      },
    },
  },
})
