import { ReactNode } from 'react'

interface LabelBoxProps {
  children: ReactNode
  label: string
  required?: boolean
}

export function LabelBox({ children, label, required }: LabelBoxProps) {
  return (
    <div className="flex flex-wrap py-0 px-1 items-center gap-1">
      <label aria-required={required} className="text-rc-highlight">
        {label}
        {required && <sup className="text-rc-warning text-xs pl-1">{'*'}</sup>}
      </label>
      {children}
    </div>
  )
}
