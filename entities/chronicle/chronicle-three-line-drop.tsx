import styles from './chronicle-styles/chronicle-three-line-drop.module.css'
import { useDrop } from 'react-dnd'
import { EDropZone } from '../../types/drop-zone'
import { useContext } from 'react'
import {
  ChronicleRoutes,
  ChronicleThreeContext,
  ChroniclesContext,
  IChronicle,
} from './chronicle'
import { usePost } from '../../hooks/post.hook'

interface IChronicleThreeLineDrop {
  position: number
}

export const ChronicleThreeLineDrop: React.FC<IChronicleThreeLineDrop> = ({
  position,
}) => {
  const [isDragging] = useContext(ChronicleThreeContext)
  const [chronicles, setChronicles] = useContext(ChroniclesContext)
  const { post } = usePost<IChronicle[]>(ChronicleRoutes.position)
  const [collectedProps, drop] = useDrop(() => ({
    accept: EDropZone.CHRONICLE,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: async (item: { id: string }) => {
      post({ position, id: item.id })
      setChronicles(
        chronicles
          .map((chronicle) => {
            if (chronicle.id === item.id) {
              chronicle.position = position
            } else if (chronicle.position >= position) chronicle.position += 1
            return chronicle
          })
          .sort((a, b) => a.position - b.position)
      )
    },
  }))

  return (
    <div
      className={styles.container}
      ref={drop}
      data-active={isDragging}
      data-hover={collectedProps?.isOver}
    />
  )
}
