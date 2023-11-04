import { ReactNode } from 'react'

interface GridboxProps {
  children: ReactNode
}

export function Gridbox({ children }: GridboxProps) {
  return (
    <div className="h-full relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
