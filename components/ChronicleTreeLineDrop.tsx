import { useDrop } from 'react-dnd'
import { EDropZone } from '@/types'

import { dc } from '@/utils'

import { useBroadcast } from '@/stores'

interface ChronicleTreeLineDrop {
  position: number
}

export function ChronicleTreeLineDrop({ position }: ChronicleTreeLineDrop) {
  const { treeIsDragging, updateTree } = useBroadcast()

  const [collectedProps, drop] = useDrop(() => ({
    accept: EDropZone.CHRONICLE,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: async ({ id }: { id: string }) => {
      updateTree(id, position)
    },
  }))

  return (
    <div
      className={dc(
        'transition-200ms-ease-in-out border-2 border-dashed  border-transparent',
        [treeIsDragging && !collectedProps?.isOver, 'h-[25px] border-rc-card-bg', 'h-0'],
        [collectedProps?.isOver, 'h-[25px] border-rc-highlight', 'h-0']
      )}
      ref={drop}
    />
  )
}
