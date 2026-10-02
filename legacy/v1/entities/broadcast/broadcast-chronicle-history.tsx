import { useTranslate } from '@/hooks'
import { Col, ExternalIcon, Gridbox } from '@/ui'
import { useGetChronicleHistory } from '@/entities'
import styles from './broadcast-styles/broadcast-chronicle-history.module.css'

export function BroadcastChronicleHistory() {
  const t = useTranslate()
  const { chronicleHistory } = useGetChronicleHistory()

  if (!chronicleHistory?.length) return null

  return (
    <div className={styles.grid}>
      <h3>{t('chroniclesHistory')}</h3>
      <Col lgGap>
        <Gridbox>
          {chronicleHistory?.map((history) => (
            <div key={history.id} className={styles.container}>
              <div className={styles.title}>
                {history.source && history.source.match(/http/) ? (
                  <a href={history.source}>
                    {history.title}
                    <span className={styles.icon}>
                      <ExternalIcon />
                    </span>
                  </a>
                ) : (
                  history.title
                )}
              </div>
              <div className={styles.editor}>{history.editor}</div>
            </div>
          ))}
        </Gridbox>
      </Col>
    </div>
  )
}
