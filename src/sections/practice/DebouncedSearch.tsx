import { useEffect, useRef, useState } from 'react'

function DebouncedSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const requestId = useRef<number>(0)

  useEffect(() => {
    console.log('effect runs')
    const timeOutId = setTimeout(() => setDebouncedSearchTerm(searchTerm), 1000)

    return () => clearTimeout(timeOutId)
  }, [searchTerm])

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      // set the results to empty array
      setLoading(false)
      return
    }

    requestId.current += 1
    const currentReqId = requestId.current
    const controller = new AbortController()

    void (async () => {
      setLoading(true)
      try {
        const response = await fetch('https://example.com', {
          method: 'POST',
          signal: controller.signal,
          body: JSON.stringify({
            search: debouncedSearchTerm,
          }),
        })

        if (!response.ok) {
          throw new Error('Network error')
        }

        const data = await response.json()
        console.log('data', data)

        if (requestId.current !== currentReqId) return

        // this is to prevent race condition (previous fetch call's data overwriting newer one)
        // some state update
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }
        // setError here
      } finally {
        if (currentReqId === requestId.current) {
          setLoading(false)
        }
      }
    })()

    return () => controller.abort()
  }, [debouncedSearchTerm])

  console.log('searchTerm', searchTerm)
  console.log('debouncedSearchTerm', debouncedSearchTerm)
  console.log('loading', loading)

  return (
    <div className="m-20">
      <input
        type="text"
        value={searchTerm}
        onChange={(ev) => {
          setSearchTerm(ev.target.value)
        }}
        className="border-2 border-gray-300 rounded-md"
      />
    </div>
  )
}

export default DebouncedSearch
