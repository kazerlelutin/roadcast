import styles from './external-link.module.css'
import { ExternalIcon } from '../icons/external-icon'

interface ExternalLinkProps {
  href: string
  text: string
}
export const ExternalLink: React.FC<ExternalLinkProps> = ({ href, text }) => (
  <span className={styles.contact}>
    <a href={href} className={styles.link} target="_blank" rel="noReferrer">
      {text}
    </a>
    <span className={styles.contactIcon}>
      <ExternalIcon />
    </span>
  </span>
)
