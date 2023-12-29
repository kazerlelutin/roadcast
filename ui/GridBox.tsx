import { ReactNode } from 'react'

interface GridboxProps {
  children: ReactNode
}

export function Gridbox({ children }: GridboxProps) {
  return (
    <div className="relative h-full">
      <div className="absolute bottom-0 left-0 right-0 top-0 overflow-y-auto">{children}</div>
    </div>
  )
}
