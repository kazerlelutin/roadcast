import { CookieConsent } from '@/components'
import { HeaderNoAuth } from '@/ui'
import styles from './basic.module.css'

interface BasicLayoutProps {
  children: React.ReactNode
}

export const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <HeaderNoAuth />
      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
      </div>
      <CookieConsent />
    </div>
  )
}
