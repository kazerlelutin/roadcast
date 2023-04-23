import styles from './progress-bar.module.css'

interface ProgressBarProps {
  value: number
  total: number
}
export const ProgressBar: React.FC<ProgressBarProps> = ({ value, total }) => {
  return (
    <div className={styles.bar}>
      <div
        className={styles.progress}
        style={{ width: `${(value / total) * 100}%` }}
      />
    </div>
  )
}
