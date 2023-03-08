import styles from './broadcast-styles/broadcast-three.module.css'
import { useContext } from 'react'
import { BroadcastContext } from './broadcast'
import { useTranslate } from '../../hooks/translate.hook'
import { NoMessage } from '../../ui/no-message/no-message'

export const BroadcastThreeComp: React.FC = () => {
  const [broadcast] = useContext(BroadcastContext)
  const t = useTranslate({
    noBroadcast: {
      en: 'No broadcast selected',
      fr: 'Aucune émission sélectionnée',
    },
  })

  if (!broadcast.id) return <NoMessage message={t('noBroadcast')} />
  return (
    <div className={styles.container}>
      <h1>Broadcast Three</h1>
    </div>
  )
}
