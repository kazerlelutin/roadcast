/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import useLocalState from './local-state.hook'

export default function useIsMobile(): boolean {
  const [localState, setLocalState] = useLocalState<{ isMobile: boolean }>(
    { isMobile: true },
    'roadcast_device'
  )

  function handleResize() {
    setLocalState({
      isMobile: window.innerWidth <= 768 ? true : false,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return typeof window !== 'undefined' ? localState.isMobile : false
}
