import dynamic from 'next/dynamic'

const About = dynamic(
  () => import('@/pages_related').then((comp) => comp.About),
  {
    ssr: false,
  }
)

export default function AboutPage() {
  return <About />
}
