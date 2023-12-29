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
    <div className="grid grid-cols-[auto_1fr] items-center gap-2 rounded-sm border border-rc-bg-dark bg-slate-900 p-1">
      <div className="w-[100px]">
        {data?.image && (
          <img
            className="h-full w-full object-cover"
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
        <a href={data.link} target="_blank" rel="noreferrer" className="flex items-center gap-2">
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
