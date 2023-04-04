import Link from 'next/link'
import { FC } from 'react'
import styles from './dms-logo.module.css'

export const DmsLogo: FC = () => (
  <div className={styles.logo}>
    <Link href={'/'}>
      <div className={styles.logoLink}>
        <span className={styles.firstLetter}>R</span>
        <span className={styles.text}>oadcast</span>
      </div>
    </Link>
  </div>
)
