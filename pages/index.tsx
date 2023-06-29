import dynamic from 'next/dynamic'

const Index = dynamic(
  () => import('@/pages_related').then((comp) => comp.IndexPage),
  {
    ssr: false,
  }
)

export default function IndexPage() {
  return <Index />
}
