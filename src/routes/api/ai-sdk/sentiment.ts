import { valibotSchema } from '@ai-sdk/valibot'
import { createFileRoute } from '@tanstack/react-router'
import { createTextStreamResponse, Output, streamText, toTextStream } from 'ai'
import { ollama } from 'ai-sdk-ollama'
import * as v from 'valibot'

const sentiments = [
  'happy',
  'sad',
  'angry',
  'satisfied',
  'frustrated',
  'excited',
  'neutral',
  'confused',
  'anxious',
  'disappointed',
]

const SentimentSchema = v.object({
  sentiment: v.picklist(sentiments),
  confidence: v.number(),
  reason: v.string(),
})

export const Route = createFileRoute('/api/ai-sdk/sentiment')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { text } = await request.json()

          // const result = await generateText({
          const result = await streamText({
            model: ollama('hoangquan456/qwen3-nothink:4b'),

            prompt: `
              You are a sentiment classifier.

              Choose EXACTLY ONE sentiment, its confidence score and a short reason why you think it is of the particular reason, from the allowed list.

              Allowed sentiments:
              ${sentiments.join(', ')}

              Message:
              ${text}
            `,

            // output: Output.choice({
            //   options: sentiments,
            // }),
            output: Output.object({
              schema: valibotSchema(SentimentSchema),
            }),

            providerOptions: {
              ollama: {
                think: false,
              },
            },
          })

          // return Response.json({
          //   sentiment: result.output,
          // })

          return createTextStreamResponse({
            stream: toTextStream({ stream: result.stream }),
          })
        } catch (err) {
          console.error(err)

          return new Response('Failed to classify sentiment', {
            status: 500,
          })
        }
      },
    },
  },
})
