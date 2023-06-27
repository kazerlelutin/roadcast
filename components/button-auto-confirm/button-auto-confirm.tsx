import { useState } from 'react'
import { Button } from '@/ui'
import { useTranslate } from '@/hooks'
import styles from './button-auto-confirm.module.css'

interface ButtonAutoConfirmProps {
  onConfirm: () => void
  text: string
  confirmText: string
}

export const ButtonAutoConfirm: React.FC<ButtonAutoConfirmProps> = ({
  onConfirm,
  text,
  confirmText,
}) => {
  const [onReady, setOnReady] = useState<boolean>(false)
  const t = useTranslate()

  const handleClick = () => {
    if (onReady) {
      onConfirm()
      setOnReady(false)
    }
  }

  if (!onReady)
    return (
      <Button type="button" onClick={() => setOnReady(true)}>
        {text}
      </Button>
    )

  return (
    <div className={styles.container}>
      <div className={styles.cancel}>
        <Button type="button" onClick={() => setOnReady(false)} variant="red">
          {t('cancel')}
        </Button>
      </div>

      <Button type="button" onClick={handleClick} variant="normal">
        {confirmText}
      </Button>
    </div>
  )
}
