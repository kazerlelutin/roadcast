import { useState } from 'react'
import { Gridbox } from '../../ui/grid-box/grid-box'
import { BroadcastCreateForm } from './broadcast-create-form'
import styles from './broadcast-styles/broadcast-create.module.css'

export const BroadcastCreate: React.FC = () => {
  return (
    <div className={styles.container}>
      <BroadcastCreateForm />
      <Gridbox>
        <p>Listes des fils rouges</p>
      </Gridbox>
    </div>
  )
}
