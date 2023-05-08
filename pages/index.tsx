import dynamic from 'next/dynamic'

const Index = dynamic(() => import('../pages_related/index/index'), {
  ssr: false,
})

export default function IndexPage() {
  return <Index />
}
