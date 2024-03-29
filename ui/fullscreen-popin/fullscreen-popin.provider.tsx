import { ReactNode, useState } from 'react'
import { FullscreenPopinContext } from '@/ui'

interface FullscreenPopinProviderProps {
  children: ReactNode
}

export const FullscreenPopinProvider: React.FC<
  FullscreenPopinProviderProps
> = ({ children }) => {
  const ctx = useState<boolean>(false)

  return (
    <FullscreenPopinContext.Provider value={ctx}>
      {children}
    </FullscreenPopinContext.Provider>
  )
}
