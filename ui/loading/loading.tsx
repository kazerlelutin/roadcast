import { FC } from 'react'
import { useTranslate } from '@/hooks'
import { Flex } from '@/ui'
import styles from './loading.module.css'

export const LoadingView: FC = () => {
  const t = useTranslate()
  return (
    <div className={styles.root}>
      <Flex center>{t('loading')}</Flex>
    </div>
  )
}
