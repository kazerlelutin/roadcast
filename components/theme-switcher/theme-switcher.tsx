import { useEffect } from 'react'
import { useLocalState } from '@/hooks'
import { LightIcon, LightOpenIcon } from '@/ui'
import styles from './theme-switcher.module.css'

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalState<{ value: 'light' | 'dark' }>(
    { value: 'light' },
    'theme'
  )

  const applyTheme = () => {
    setTheme({ value: theme.value === 'light' ? 'dark' : 'light' })
  }

  useEffect(() => {
    document.documentElement.setAttribute('class', theme.value)
    document.documentElement.setAttribute('class', theme.value)
  }, [theme])

  return (
    <div className={styles.container} onClick={applyTheme}>
      <div className={styles.icon}>
        {theme.value === 'light' ? (
          <LightOpenIcon />
        ) : (
          <div className={styles.light}>
            <LightIcon />
          </div>
        )}
      </div>
    </div>
  )
}
