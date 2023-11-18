interface InputProps {
  value: string
  onChange?: (value: string) => void
  disabled?: boolean
  id?: string
  error?: string
}

export function Input({ value, id, disabled, error, onChange }: InputProps) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        id={id}
        className="w-full rounded-md border border-rc-bg-dark bg-rc-card px-2 py-1 text-rc-text outline-none  focus:border-rc-highlight disabled:cursor-text disabled:bg-transparent disabled:text-rc-text"
      />
      {error && <div className="absolute -top-4 right-0 pr-2 text-xs text-rc-warning-light">{error}</div>}
    </div>
  )
}
