import Link from 'next/link'
import { FC } from 'react'
import styles from './roadcast-logo.module.css'
import * as pkg from '../../package.json'
const { version } = pkg

export const RoadcastLogo: FC = () => (
  <div className={styles.logo} title={version}>
    <Link href={'/'}>
      <div className={styles.logoLink}>
        <span className={styles.firstLetter}>R</span>
        <span className={styles.text}>oadcast</span>
      </div>
    </Link>
  </div>
)
