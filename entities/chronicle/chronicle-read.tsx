import { useTranslate } from '../../hooks/translate.hook'
import { getReadTime } from '../../utils/get-read-time'
import { getTextInHtml } from '../../utils/get-text-in-html'
import { useChronicles } from './chronicle'
import styles from './chronicle-styles/chronicle-read.module.css'
import { ChronicleWrapper } from './chronicle-wrapper'
import { useModes } from '../broadcast/broadcast'
import { MediaList } from '../media/media-list'
import { Col } from '../../ui/col/col'
import { LinkPreview } from '../../components/link-preview/link-preview'

export const ChronicleRead: React.FC = () => {
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

        <div dangerouslySetInnerHTML={{ __html: chronicle.text || '' }} />
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
