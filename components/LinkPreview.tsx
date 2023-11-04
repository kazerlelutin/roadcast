/* eslint-disable @next/next/no-img-element */
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

export function LinkPreview({ url }: LinkPreviewProps) {
  const { data } = useFetch<IPreview>(ChronicleRoutes.previewSource, {
    link: url,
  })

  if (!data) return <div>{'...'}</div>

  if (!data?.link) return null
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 items-center border border-rc-bg-dark rounded-sm p-1 bg-slate-900">
      <div className="m-w-[100px]">
        {data?.image && (
          <img
            src={data?.image}
            alt="Link preview"
            onError={({ currentTarget }) => {
              console.log('error')
              currentTarget.remove()
            }}
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <a
          href={data.link}
          target="_blank"
          rel="noreferrer"
          className="flex gap-2 items-center"
        >
          {data.title}
          <span>
            <ExternalIcon />
          </span>
        </a>

        <div className="text-xs">{data?.description}</div>
      </div>
    </div>
  )
}
