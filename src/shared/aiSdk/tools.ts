import { valibotSchema } from '@ai-sdk/valibot'
import { tool } from 'ai'
import * as v from 'valibot'

const locationTool = tool({
  description: 'Get the location of a person.',

  inputSchema: valibotSchema(
    v.object({
      name: v.pipe(v.string(), v.description('The name of the person')),
    }),
  ),

  execute: async ({ name }) => {
    // simulate an API request
    // Make sure to handle try catch from here.
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (name === 'Bruce Wayne') {
      return 'Gotham'
    }

    return 'Kolkata'
  },
})

const weatherTool = tool({
  description: 'Get the weather for a city.',

  inputSchema: valibotSchema(
    v.object({
      city: v.string(),
    }),
  ),

  execute: async ({ city }) => {
    // simulate an API request
    // Make sure to handle try catch from here.
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (city === 'Gotham') {
      return {
        city,
        temperature: 12,
        condition: 'Cloudy',
      }
    }

    return {
      city,
      temperature: 28,
      condition: 'Sunny',
    }
  },
})

const timeTool = tool({
  description: 'Returns the current time for a timezone.',

  inputSchema: valibotSchema(
    v.object({
      timezone: v.string(),
    }),
  ),

  execute: async ({ timezone }) => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    return {
      timezone,
      currentTime: new Date().toISOString(),
    }
  },
})

const addTool = tool({
  description: 'Adds two numbers.',

  inputSchema: valibotSchema(
    v.object({
      a: v.number(),
      b: v.number(),
    }),
  ),

  execute: ({ a, b }) => {
    return {
      result: a + b,
    }
  },
})

export const tools = {
  weather: weatherTool,
  time: timeTool,
  add: addTool,
  location: locationTool,
}
