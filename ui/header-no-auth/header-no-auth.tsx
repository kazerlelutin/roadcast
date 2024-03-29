import dynamic from 'next/dynamic'
import { FC } from 'react'
import { RoadcastLogo, KofiButton } from '@/ui'
import styles from './header-no-auth.module.css'

//for prevent SSR render with localStorage
const ThemeSwitcher = dynamic(
  () =>
    import('../../components/theme-switcher/theme-switcher').then(
      (mod) => mod.ThemeSwitcher
    ),
  {
    ssr: false,
  }
)

export const HeaderNoAuth: FC = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <RoadcastLogo />
      <div className={styles.actions}>
        <KofiButton />
        <ThemeSwitcher />
      </div>
    </header>
  </div>
)
