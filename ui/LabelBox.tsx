import { ReactNode } from 'react'

interface LabelBoxProps {
  children: ReactNode
  label: string
  required?: boolean
}

export function LabelBox({ children, label, required }: LabelBoxProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 px-1 py-0">
      <label aria-required={required} className="text-rc-highlight">
        {label}
        {required && <sup className="pl-1 text-xs text-rc-warning">{'*'}</sup>}
      </label>
      {children}
    </div>
  )
}
