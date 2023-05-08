/* eslint-disable @next/next/no-img-element */
import styles from './link-preview.module.css'
import { useFetch } from '../../hooks/fetch.hook'
import { ChronicleRoutes } from '../../entities/chronicle/chronicle'
import { ExternalIcon } from '../../ui/icons/external-icon'

export interface LinkPreviewProps {
  url: string
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const { data } = useFetch<{
    title: string
    description: string
    image: string
    link: string
  }>(ChronicleRoutes.previewSource, { link: url })

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
