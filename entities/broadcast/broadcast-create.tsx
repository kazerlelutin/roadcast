import { Gridbox } from '../../ui/grid-box/grid-box'
import { BroadcastCreateForm } from './broadcast-create-form'
import { BroadcastList } from './broadcast-list'
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
