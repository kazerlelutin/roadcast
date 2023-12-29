import { ReactNode } from 'react'

type LabelProps = {
  children: ReactNode
  required?: boolean
}

export function Label({ children, required }: LabelProps) {
  return (
    <label aria-required={required} className="text-sm">
      {children}
      {required && <sup className="pl-1 text-xs text-rc-warning-light">{'*'}</sup>}
    </label>
  )
}
