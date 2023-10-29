import { useTranslate } from '@/hooks'
import { getReadTime, getTextInHtml } from '@/utils'
import { MediaList, useChronicle } from '@/entities'
import { ChronicleWrapper, LinkPreview } from '@/components'
import { useBroadcast } from '@/stores/broadcast.store'
import { dc } from '@/utils/dynamic-classes'
import { Input } from '@/ui/input'

export function ChronicleRead() {
  const t = useTranslate()
  const { focusMode, currentChronicle } = useBroadcast()
  const { chronicle } = useChronicle()

  return (
    <ChronicleWrapper>
      <div
        className={dc('py-1 transition-all duration-300 ease-in-out', [
          focusMode || currentChronicle !== chronicle.id,
          'opacity-20',
        ])}
        id={chronicle.id}
      >
        <h2 className="py-1 transition-all duration-300 ease-in-out">
          {`#${chronicle.position + 1}`} {chronicle.title}{' '}
          <span className="text-sm text-rc-light ">
            {'~'} {getReadTime(getTextInHtml(chronicle.text))} {t('min')}
          </span>
        </h2>

        <p className="text-rc-light pb-2 border-b border-rc-bg-dark mt-4">
          {chronicle?.editor?.name || t('noEditor')}
        </p>

        <div dangerouslySetInnerHTML={{ __html: chronicle.text || '' }} />
        {chronicle.source && chronicle.source.match(/http/) && (
          <div className="flex flex-col gap-1">
            <h3>{t('source')}</h3>
            <LinkPreview url={chronicle.source} />
            <Input value={chronicle.source} disabled={true} />
          </div>
        )}
      </div>
      <MediaList />
    </ChronicleWrapper>
  )
}
