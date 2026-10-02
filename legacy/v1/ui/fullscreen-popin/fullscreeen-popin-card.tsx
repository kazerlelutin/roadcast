import { FC, ReactNode } from 'react'
import { useFullscreenPopin, Card } from '@/ui'
import styles from './fullscreen-popin.module.css'

interface FullScreenPopinCardProps {
  children: ReactNode
  title: string
}
export const FullScreenPopinCard: FC<FullScreenPopinCardProps> = ({
  children,
  title,
}) => {
  const { modalIsOpen, closeModale } = useFullscreenPopin()

  return (
    modalIsOpen && (
      <div className={styles.container}>
        <div className={styles.modale}>
          <Card title={title} onClose={closeModale} type="classic">
            {children}
          </Card>
        </div>
      </div>
    )
  )
}
