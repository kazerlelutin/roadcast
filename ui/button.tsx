import { ReactNode } from 'react'

import { dc } from '@/utils'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'normal' | 'twitch' | 'red'
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
}

export function Button({
  children,
  variant,
  onClick,
  type = 'button',
  loading,
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      className={dc(
        'disabled:opacity-50',
        'text-xs',
        'outline-none border border-light-text dark:border-rc-text uppercase py-1 px-2 text-rc-text',
        'cursor-pointer transition duration-200 ease-in-out',
        'rounded-3xl',
        'hover:bg-rc-info hover:border-rc-info-light hover:text-rc-text',
        [variant === 'normal', 'bg-rc-info-light border-rc-info text-rc-text'],
        [
          variant === 'twitch',
          'bg-twitch-primary border-twitch-primary text-dms-text-invert',
        ],
        [variant === 'red', 'bg-rc-warning border-rc-warning text-rc-text'],
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
