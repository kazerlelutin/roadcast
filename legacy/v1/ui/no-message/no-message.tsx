import styles from './no-message.module.css'

interface NoMessageProps {
  message: string
}

export const NoMessage: React.FC<NoMessageProps> = ({ message }) => (
  <div className={styles.container}>{message}</div>
)
