import { PromiseRender } from '../../components/promise-render/promise-render'
import { Col } from '../../ui/col/col'
import { ExternalIcon } from '../../ui/icons/external-icon'
import { useGetChronicleHistory } from './broadcast'
import styles from './broadcast-styles/broadcast-chronicle-history.module.css'

export const BroadcastChronicleHistory: React.FC = () => {
  const { chronicleHistory, loading } = useGetChronicleHistory()

  return (
    <PromiseRender loading={loading} data={chronicleHistory}>
      <Col lgGap>
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
      </Col>
    </PromiseRender>
  )
}
