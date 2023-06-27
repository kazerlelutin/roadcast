import { FC, ReactNode, ReactElement } from 'react'
import { CloseIcon, Flex } from '@/ui'
import styles from './card.module.css'

interface CardProps {
  children: ReactNode
  type?: 'classic' | 'highlight' | 'warning' | 'info'
  title?: string | ReactElement
  stretch?: boolean
  onClose?: () => void
}
export const Card: FC<CardProps> = ({
  children,
  type,
  title,
  onClose,
  stretch,
}) => {
  return (
    <div className={styles.card} data-type={type} data-stretch={stretch}>
      {(title || onClose) && (
        <div className={styles.title}>
          <Flex spaceBetween>
            {title && <div className={styles.titleText}>{title}</div>}
            {onClose && (
              <div className={styles.close} onClick={onClose}>
                <CloseIcon />
              </div>
            )}
          </Flex>
        </div>
      )}
      <div className={styles.main}>{children}</div>
    </div>
  )
}
