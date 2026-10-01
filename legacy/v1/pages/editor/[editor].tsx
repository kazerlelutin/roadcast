import { prisma } from '@/db'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const WriterWrapper = dynamic(
  () =>
    import('@/components/Writer/WriterWrapper').then(
      (comp) => comp.WriterWrapper
    ),
  {
    ssr: false,
  }
)

export default function EditorPage({
  title,
  editorToken,
}: {
  editorToken: string
  readerToken: string
  title: string
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <WriterWrapper editorToken={editorToken} />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const broadcast = await prisma.broadcast.findFirst({
    where: { editor: query.editor },
    select: {
      title: true,
    },
  })

  if (!broadcast) {
    return {
      redirect: '/',
    }
  }

  return {
    props: { title: broadcast.title, editorToken: query.editor },
  }
}
