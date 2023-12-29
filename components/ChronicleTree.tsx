/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { EDropZone } from '@/types'

import { ChronicleProvider } from '@/entities'
import { useBroadcast } from '@/stores'

import { useTranslate } from '@/hooks'
import { getResume, dc } from '@/utils'

import { ChronicleRefreshButton, ChronicleTreeLineDrop } from '@/components'
import { GrabIcon, NoMessage } from '@/ui'
import { useChronicle } from '@/entities'

export function ChronicleTree() {
  const t = useTranslate()
  const { broadcast } = useBroadcast()

  if (!broadcast.id) return <NoMessage message={t('noBroadcast')} />

  return (
    <div className="flex flex-col gap-1">
      <ChronicleRefreshButton />
      {broadcast.chronicles.length > 0 && <ChronicleTreeLineDrop position={0} />}
      {broadcast.chronicles.map((chronicle) => (
        <ChronicleProvider key={chronicle.id} id={chronicle.id}>
          <ChronicleTreeLine key={`${chronicle.id}-${chronicle?.editor?.id}-${chronicle.position}`} />
        </ChronicleProvider>
      ))}
    </div>
  )
}

export function ChronicleTreeLine() {
  const t = useTranslate()
  const { readMode, currentChronicle, setCurrentChronicle, updateDrag } = useBroadcast()
  const { chronicle } = useChronicle()

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: EDropZone.CHRONICLE,
    item: { id: chronicle.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    updateDrag(collected.isDragging)
  }, [collected.isDragging])

  if (collected.isDragging) return <div ref={dragPreview} />

  return (
    <div className="text-xs">
      <div className="mt-1" ref={drag}>
        <div className="flex items-center gap-3">
          <div className="cursor-grab">{readMode ? `#${chronicle.position + 1}` : <GrabIcon />}</div>
          <div className="flex flex-col gap-1">
            <a
              className={dc([
                currentChronicle === chronicle.id,
                'text-rc-light visited:text-rc-light',
                'text-rc-text visited:text-rc-text',
              ])}
              href={`#${chronicle.id}`}
              onClick={() => setCurrentChronicle(chronicle.id)}
            >
              {getResume(chronicle.title, 20)}
            </a>
            <a className="italic text-rc-text opacity-50 visited:text-rc-text" href={`#${chronicle.id}`}>
              {getResume(chronicle?.editor?.name || t('noEditor'), 20)}
            </a>
          </div>
        </div>
        {!collected.isDragging && (
          <div className="cursor-grab">
            <ChronicleTreeLineDrop position={chronicle.position + 1} />
          </div>
        )}
      </div>
    </div>
  )
}
