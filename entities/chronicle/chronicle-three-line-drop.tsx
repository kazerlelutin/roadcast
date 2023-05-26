import styles from './chronicle-styles/chronicle-three-line-drop.module.css'
import { useDrop } from 'react-dnd'
import { EDropZone } from '../../types/drop-zone'
import { useContext } from 'react'
import {
  ChronicleRoutes,
  ChroniclesContext,
  IChronicle,
  useThreeChronicle,
} from './chronicle'
import { usePost } from '../../hooks/post.hook'

interface IChronicleThreeLineDrop {
  position: number
}

export const ChronicleThreeLineDrop: React.FC<IChronicleThreeLineDrop> = ({
  position,
}) => {
  const { isDragging, updateThree } = useThreeChronicle()
  const { post } = usePost<IChronicle[]>(ChronicleRoutes.position)
  const [collectedProps, drop] = useDrop(() => ({
    accept: EDropZone.CHRONICLE,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: async ({ id }: { id: string }) => {
      post({ position, id })
      updateThree(id, position)
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
