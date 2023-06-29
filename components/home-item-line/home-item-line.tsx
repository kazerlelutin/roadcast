import { useRouter } from 'next/router'
import styles from './home-item-line.module.css'

interface HomeItemLineProps {
  item: {
    reader: string
    editor?: string
    title?: string
  }
  type: 'schedule' | 'broadcast'
}

type TQuery = {
  id: string
  page: string
}

export function HomeItemLine({ item, type }: HomeItemLineProps) {
  const router = useRouter()

  const handleClick = () => {
    const query: TQuery = {
      id: item.reader,
      page: 'reader',
    }

    if (item.editor) {
      query.id = item.editor
      query.page = 'editor'
    }

    router.push({
      pathname: `/${type === 'schedule' ? 'schedule/' : ''}${query.page}/${
        query.id
      }`,
      query,
    })
  }

  return (
    <li className={styles.container} onClick={handleClick}>
      {item?.title}
    </li>
  )
}
