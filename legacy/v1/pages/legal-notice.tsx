import dynamic from 'next/dynamic'

const LegalNotice = dynamic(
  () => import('@/pages_related').then((comp) => comp.LegalNotice),
  {
    ssr: false,
  }
)
export default function LegalNoticePage() {
  return <LegalNotice />
}
