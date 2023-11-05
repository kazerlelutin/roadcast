import {
  BroadcastCreateNewWithHistory,
  BroadcastChronicleHistory,
} from '@/entities'
import { Resume, Actions, ChronicleTree, Chronicles } from '@/components'
import { Gridbox, HeaderNoAuth, LabelBox } from '@/ui'
import { useIsMobile, useTranslate } from '@/hooks'
import { useBroadcast } from '@/stores'
import { BroadcastStringEditor } from '@/components/BroadcastStringEditor'

export function Editor() {
  const { broadcast } = useBroadcast()
  const isMobile = useIsMobile()
  const t = useTranslate()

  if (isMobile)
    return (
      <div className="h-screen p-2 bg-light-bg dark:bg-rc-bg text-light-text dark:text-rc-text overflow-y-hidden">
        <HeaderNoAuth />
        <div className="grid grid-rows-[auto_1fr_100px] h-full gap-3">
          {broadcast.title && (
            <div className='flex w-full justify-center'>
            <LabelBox label={t('Title')}>
              <BroadcastStringEditor key={broadcast.editor} name="title" />
            </LabelBox>
            </div>
          )}
          <Gridbox>
            <Chronicles />
          </Gridbox>
          <div className="w-full flex gap-1 items-start justify-center">
            <Actions />
          </div>
        </div>
      </div>
    )

  return (
    <div className="h-screen p-2 bg-light-bg dark:bg-rc-bg text-light-text dark:text-rc-text overflow-y-hidden">
      <HeaderNoAuth />
      <div className="grid grid-cols-[245px_5fr_220px] h-full gap-1">
        <div className="grid grid-rows-[auto_1fr_40px] gap-2">
          <div className="flex flex-col gap-1">
            <Resume />
            <div className="m-auto max-w-[200px] mt-3">
              <Actions />
            </div>
            <div className="m-auto max-w-[200px] mt-2">
              <BroadcastCreateNewWithHistory />
            </div>
          </div>
          <BroadcastChronicleHistory />
        </div>

        <Gridbox>
          <div className="max-w-[600px] m-auto pb-[100px]">
            <Chronicles />
          </div>
        </Gridbox>
        <Gridbox>
          <div className="p-2">
            <ChronicleTree />
          </div>
        </Gridbox>
      </div>
    </div>
  )
}
