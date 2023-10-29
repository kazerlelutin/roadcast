/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { GrabIcon } from '@/ui'
import { useChronicle } from '@/entities'
import { useDrag } from 'react-dnd'
import { EDropZone } from '@/types'
import { getResume } from '@/utils'
import { useTranslate } from '@/hooks'
import { useBroadcast } from '@/stores/broadcast.store'
import { ChronicleTreeLineDrop } from '@/components'
import { dc } from '@/utils/dynamic-classes'

export function ChronicleTreeLine() {
  const t = useTranslate()
  const { readMode, currentChronicle, setCurrentChronicle, updateDrag } =
    useBroadcast()
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
          <div className="cursor-grab">
            {readMode ? `#${chronicle.position + 1}` : <GrabIcon />}
          </div>
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
            <a
              className="italic opacity-50 text-rc-text visited:text-rc-text"
              href={`#${chronicle.id}`}
            >
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
