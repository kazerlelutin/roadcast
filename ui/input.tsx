interface InputProps {
  value: string
  onChange?: (value: string) => void
  disabled?: boolean
}

export function Input({ value, onChange, disabled }: InputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className="outline-none rounded-md px-2 py-1 bg-rc-card border border-rc-bg-dark text-rc-text focus:border-rc-highlight disabled:border-transparent disabled:bg-transparent disabled:rounded-none disabled:px-0 disabled:py-0 disabled:text-rc-text disabled:cursor-pointer"
    />
  )
}
