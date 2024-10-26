import { useTranslate } from '@/hooks'
import { getReadTime, getTextInHtml } from '@/utils'
import {
  useChronicles,
  ChronicleWrapper,
  MediaList,
  useModes,
} from '@/entities'
import styles from './chronicle-styles/chronicle-read.module.css'
import { Col } from '@/ui'
import { LinkPreview } from '@/components'
import { MediaInText } from '../media/media-in-text'

export function ChronicleRead() {
  const t = useTranslate()
  const { currentChronicle, chronicle } = useChronicles()
  const { isFocused } = useModes()

  return (
    <ChronicleWrapper>
      <div
        className={styles.container}
        id={chronicle.id}
        data-visible={!isFocused || currentChronicle === chronicle.id}
      >
        <h2 className={styles.container}>
          {`#${chronicle.position + 1}`} {chronicle.title}{' '}
          <span className={styles.time}>
            {getReadTime(getTextInHtml(chronicle.text))}
          </span>
        </h2>
        <p className={styles.editor}>
          {chronicle?.editor?.name || t('noEditor')}
        </p>
        <MediaInText />

        {chronicle.source && chronicle.source.match(/http/) && (
          <Col center>
            <h3>{t('source')}</h3>
            <LinkPreview url={chronicle.source} />
            <input
              value={chronicle.source}
              readOnly={true}
              className={styles.source}
            />
          </Col>
        )}
      </div>
      <MediaList />
    </ChronicleWrapper>
  )
}
