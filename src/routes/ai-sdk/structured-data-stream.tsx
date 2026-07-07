import { createFileRoute } from '@tanstack/react-router'
import { parse } from 'partial-json'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/ai-sdk/structured-data-stream')({
  component: RouteComponent,
})

function RouteComponent() {
  const [person, setPerson] = useState<{
    name?: string
    age?: number
    hobbies?: string[]
  }>({})

  const scheduled = useRef(false)

  async function run() {
    const response = await fetch('/api/ai-sdk/structured', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'Sunny is 24 years old and likes football and chess.',
      }),
    })

    const reader = response.body!.getReader()
    const decoder = new TextDecoder()

    let json = ''

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      json += decoder.decode(value, {
        stream: true,
      })

      if (!scheduled.current) {
        scheduled.current = true

        requestAnimationFrame(() => {
          scheduled.current = false

          try {
            const object = parse(json)

            setPerson(object)
          } catch (err) {
            console.log('err', err)
          }
        })
      }
    }
  }

  return (
    <>
      <button onClick={run}>Generate</button>

      <pre>{JSON.stringify(person, null, 2)}</pre>

      <h3>{person.name}</h3>

      <p>{person.age}</p>

      <ul>
        {person.hobbies?.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </>
  )
}
