import { useState } from 'react'

export default function useLocalState<T>(
  initialState: T,
  nameOfState: string
): [T, (state: T) => void] {
  const ls = (): T => {
      if (typeof window !== 'undefined') {
        const ls = localStorage.getItem(nameOfState)
        return ls ? JSON.parse(ls) : initialState
      } else {
        return initialState
      }
    },
    [state, setState] = useState<T>(ls())

  function setLocalState(newState: T) {
    setState(newState)
    localStorage.setItem(nameOfState, JSON.stringify(newState))
  }

  return [state, setLocalState]
}
