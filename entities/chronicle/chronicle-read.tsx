import { useContext } from 'react'
import { useTranslate } from '../../hooks/translate.hook'
import { getReadTime } from '../../utils/get-read-time'
import { getTextInHtml } from '../../utils/get-text-in-html'
import { ChronicleContext, ChronicleToScreenContext } from './chronicle'
import styles from './chronicle-styles/chronicle-read.module.css'
import { ChronicleWrapper } from './chronicle-wrapper'
import { BroadcastFocusContext } from '../broadcast/broadcast'
import { MediaList } from '../media/media-list'
import { Label } from '../../ui/label/label'
import { Col } from '../../ui/col/col'
import { Flex } from '../../ui/flex/flex'

export const ChronicleRead: React.FC = () => {
  const [currentChronicle] = useContext(ChronicleToScreenContext)
  const [focusMode] = useContext(BroadcastFocusContext)
  const t = useTranslate({
    noEditor: {
      en: 'No editor',
      fr: 'Aucun chroniqueur',
    },
  })
  const [chronicle] = useContext(ChronicleContext)

  return (
    <ChronicleWrapper>
      <div
        className={styles.container}
        id={chronicle.id}
        data-visible={!focusMode || currentChronicle === chronicle.id}
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
        {chronicle.source && (
          <Flex center>
            <Label>{t('source')}</Label>
            <input
              value={chronicle.source}
              readOnly={true}
              className={styles.source}
            />
          </Flex>
        )}
      </div>
      <MediaList />
    </ChronicleWrapper>
  )
}
