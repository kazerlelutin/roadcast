import { useState, useEffect } from 'react'
import useLocalState from '../../hooks/local-state.hook'
import { LightIcon } from '../../ui/icons/light-icon'
import { LightOpenIcon } from '../../ui/icons/light-open-icon'
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
    document.body.setAttribute('data-color-scheme', theme.value)
    document.body.setAttribute('data-color-mode', theme.value)
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
