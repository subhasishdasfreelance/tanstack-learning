import { useReducer } from 'react'

// does not support nested states
export default function useMultiState<T extends object>(initialState: T) {
  const [state, setState] = useReducer(
    (_state: T, _updates: Partial<T>): T => ({
      ..._state,
      ..._updates,
    }),
    initialState,
  )

  return [state, setState] as const
}
