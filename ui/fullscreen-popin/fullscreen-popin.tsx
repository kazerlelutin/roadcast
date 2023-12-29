import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import {
  FullscreenPopinProvider,
  FullScreenPopinCard,
  FullscreenPopinAction,
  FullscreenPopinContext,
} from '@/ui'
import { createPortal } from 'react-dom'
interface FullScreenPopinProps {
  children: ReactNode
  title: string
  action: ReactNode | string
}

/**
 *
 * @deprecated Use headless ui instead
 */
export const FullScreenPopin: FC<FullScreenPopinProps> = ({
  children,
  title,
  action,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return (
    <FullscreenPopinProvider>
      <FullscreenPopinAction>{action}</FullscreenPopinAction>
      {mounted &&
        createPortal(
          <FullScreenPopinCard title={title}>{children}</FullScreenPopinCard>,
          document.getElementById('fullscreen-popin')
        )}
    </FullscreenPopinProvider>
  )
}

export const useFullscreenPopin = () => {
  const ctx = useContext(FullscreenPopinContext)

  if (!ctx)
    throw new Error(
      'useFullscreenPopin must be used within a FullscreenPopinProvider'
    )
  const [modalIsOpen, setIsOpen] = ctx

  const openModale = () => {
    setIsOpen(true)
  }

  const closeModale = () => {
    setIsOpen(false)
  }

  return {
    modalIsOpen,
    openModale,
    closeModale,
  }
}
