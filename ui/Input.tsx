interface InputProps {
  value: string
  onChange?: (value: string) => void
  disabled?: boolean
  id?: string
}

export function Input({ value, id, disabled, onChange }: InputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      id={id}
      className="rounded-md border border-rc-bg-dark bg-rc-card px-2 py-1 text-rc-text outline-none focus:border-rc-highlight  disabled:cursor-text disabled:bg-transparent disabled:text-rc-text"
    />
  )
}
