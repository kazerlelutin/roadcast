import { FC } from 'react'
import styles from './error-msg.module.css'

interface ErrorMsgProps {
  error?: string
}
export const ErrorMsg: FC<ErrorMsgProps> = ({ error }) => (
  <div className={styles.container}>
    {error && <div className={styles.error}>{error}</div>}
  </div>
)
