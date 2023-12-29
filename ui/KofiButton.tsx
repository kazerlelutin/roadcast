import Image from 'next/image'
import { useTranslate } from '@/hooks'

import va from '@vercel/analytics'

export function KofiButton() {
  const t = useTranslate({
    BuyCoffe: {
      en: 'Buy me a coffee',
      fr: 'Payez-moi un café',
    },
  })
  return (
    <a
      onClick={() => {
        va.track('kofiButton')
      }}
      className=" fixed bottom-1 right-1 flex  items-center justify-center gap-1 text-sm md:relative"
      href="https://ko-fi.com/kazerlelutin"
      target="_blank"
      rel="noreferrer"
    >
      <div className=" z-30 rounded-sm border-y-rc-bg p-1">{t('BuyCoffe')}</div>

      <div className="h-[20px] w-[30px]">
        <Image src="/kofi_logo.svg" width={30} height={20} alt="kofi logo" />
      </div>
    </a>
  )
}
