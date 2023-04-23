import { useState } from 'react'

export default function useLocalState<T>(
  initialState: T,
  nameOfState: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const ls = (): T => {
      if (typeof window !== 'undefined') {
        const ls = localStorage.getItem(nameOfState)
        if (ls) return JSON.parse(ls)
        localStorage.setItem(nameOfState, JSON.stringify(initialState))
        return initialState
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
