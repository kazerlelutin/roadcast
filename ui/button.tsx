import { ReactNode } from 'react'

import { dc } from '@/utils'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'normal' | 'twitch' | 'red'
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
}

export function Button({ children, variant, onClick, type = 'button', loading }: ButtonProps) {
  return (
    <button
      disabled={loading}
      className={dc(
        'disabled:opacity-50',
        'text-xs',
        'border border-light-text px-2 py-1 uppercase text-rc-text outline-none dark:border-rc-text',
        'cursor-pointer transition duration-200 ease-in-out',
        'rounded-3xl',
        'hover:border-rc-info-light hover:bg-rc-info hover:text-rc-text',
        [variant === 'normal', 'border-rc-info bg-rc-info-light text-rc-text'],
        [variant === 'twitch', 'text-dms-text-invert border-twitch-primary bg-twitch-primary'],
        [variant === 'red', 'border-rc-warning bg-rc-warning text-rc-text'],
        [!variant, 'bg-rc-highlight-dark text-rc-text']
      )}
      onClick={() => onClick?.()}
      data-variant={variant}
      type={type}
    >
      {children}
    </button>
  )
}
