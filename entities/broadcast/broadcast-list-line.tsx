import { useRouter } from 'next/router'
import { IBroadcast } from '@/entities'
import styles from './broadcast-styles/broadcast-list-line.module.css'

interface BroadcastListLineProps {
  broadcast: IBroadcast
}

type TQuery = {
  id: string
  page: string
  admin?: string
  editor?: string
  reader?: string
}

export const BroadcastListLine: React.FC<BroadcastListLineProps> = ({
  broadcast,
}) => {
  const router = useRouter()

  const handleClick = () => {
    const query: TQuery = {
      id: broadcast.id,
      page: 'broadcast',
    }
    if (broadcast.editor) {
      query.editor = broadcast.editor
    }

    if (broadcast.reader) {
      query.reader = broadcast.reader
    }

    router.push({
      pathname: '/editor/' + broadcast.editor,
      query,
    })
  }

  return (
    <li className={styles.container} onClick={handleClick}>
      {broadcast.title}
    </li>
  )
}
