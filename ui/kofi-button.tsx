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
      className=" fixed md:relative bottom-1 right-1  flex justify-center gap-1 text-sm items-center"
      href="https://ko-fi.com/kazerlelutin"
      target="_blank"
      rel="noreferrer"
    >
      <div className=" p-1 rounded-sm z-30 border-y-rc-bg">{t('BuyCoffe')}</div>

      <div className="w-[30px] h-[20px]">
        <Image src="/kofi_logo.svg" width={30} height={20} alt="kofi logo" />
      </div>
    </a>
  )
}
