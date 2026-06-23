import { Button } from '@heroui/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const cacheData = new Map()

const useQuery = (key: string, fn: (...arg: any[]) => void) => {
  const [data, setData] = useState<unknown | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>()
  const reqId = useRef(0)
  // const cachedData = cacheData.get(key)

  const getter = useCallback(
    async (force?: boolean) => {
      setError(false)
      const currentReq = ++reqId.current

      if (cacheData.has(key) && !force) {
        console.log('returning from cache', cacheData)
        setData(cacheData)
        return
      }

      setLoading(true)
      try {
        const res = await fn()
        if (currentReq === reqId.current) {
          setData(res)
        }
        cacheData.set(key, res)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    [fn, key],
  )

  useEffect(() => {
    getter()
  }, [getter])

  return { data, loading, error, refetch: () => getter(true) }
}

export default function ReactQuery() {
  const [id, setId] = useState('1')

  const fetchUsers = useCallback(async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    )
    const result = await response.json()
    return result
  }, [id])

  const { data, loading, error, refetch } = useQuery(
    'users',

    fetchUsers,
  )

  console.log('data', data)
  console.log('loading', loading)
  console.log('error', error)
  console.log('refetch', refetch)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        ReactQuery
        <Button onPress={refetch}>Refetch</Button>
        <Button onPress={() => setId('1')}>set 1</Button>
        <Button onPress={() => setId('2')}>Set 2</Button>
      </div>
    </div>
  )
}
