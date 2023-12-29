/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useLocalState } from '@/hooks'

export function useIsMobile(): boolean {
  const [localState, setLocalState] = useLocalState<{ isMobile: boolean }>(
    { isMobile: true },
    'roadcast_device'
  )

  function handleResize() {
    setLocalState({
      isMobile: window.innerWidth <= 768,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return typeof window !== 'undefined' ? localState.isMobile : false
}
