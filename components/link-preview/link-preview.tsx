/* eslint-disable @next/next/no-img-element */
import styles from './link-preview.module.css'
import { useFetch } from '@/hooks'
import { ChronicleRoutes } from '@/entities'
import { ExternalIcon } from '@/ui'

export interface LinkPreviewProps {
  url: string
}

interface IPreview {
  title: string
  description: string
  image: string
  link: string
}
export const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const { data } = useFetch<IPreview>(ChronicleRoutes.previewSource, {
    link: url,
  })

  if (!data) return <div>{'...'}</div>

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <img
          src={data?.image}
          alt="Link preview"
          onError={({ currentTarget }) => {
            currentTarget.remove()
          }}
        />
      </div>

      <div className={styles.linkContainer}>
        <div className={styles.link}>
          <a href={data.link} target="_blank" rel="noreferrer">
            {data.title}{' '}
            <span className={styles.icon}>
              <ExternalIcon />
            </span>
          </a>
        </div>
        <div className={styles.description}>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  )
}
