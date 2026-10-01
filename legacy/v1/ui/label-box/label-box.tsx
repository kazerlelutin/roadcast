import { FC, ReactNode } from 'react'
import styles from './label-box.module.css'

interface LabelBoxProps {
  children: ReactNode
  label: string
  required?: boolean
}

export const LabelBox: FC<LabelBoxProps> = ({ children, label, required }) => (
  <div className={styles.container}>
    <label aria-required={required} className={styles.label}>
      {label}
      {required && <sup className={styles.star}>{'*'}</sup>}
    </label>
    <div className={styles.content}>{children}</div>
  </div>
)
