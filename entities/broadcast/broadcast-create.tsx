import { Gridbox } from '@/ui'
import { BroadcastList, BroadcastCreateForm } from '@/entities'
import styles from './broadcast-styles/broadcast-create.module.css'

export const BroadcastCreate: React.FC = () => {
  return (
    <div className={styles.container}>
      <BroadcastCreateForm />
      <Gridbox>
        <BroadcastList />
      </Gridbox>
    </div>
  )
}
