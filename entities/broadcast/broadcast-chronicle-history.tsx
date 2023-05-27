import { PromiseRender } from '../../components/promise-render/promise-render'
import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import { Gridbox } from '../../ui/grid-box/grid-box'
import { ExternalIcon } from '../../ui/icons/external-icon'
import { useGetChronicleHistory } from './broadcast'
import styles from './broadcast-styles/broadcast-chronicle-history.module.css'

export const BroadcastChronicleHistory: React.FC = () => {
  const t = useTranslate()
  const { chronicleHistory, loading } = useGetChronicleHistory()

  if (!loading && !chronicleHistory?.length) return null

  return (
    <PromiseRender loading={loading} data={chronicleHistory}>
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
    </PromiseRender>
  )
}
