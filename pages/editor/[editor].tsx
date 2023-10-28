/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { prisma } from '@/db'
import { useBroadcast } from '@/stores/broadcast.store'
import { SocketProvider } from '@/components'

const Editor = dynamic(
  () => import('@/pages_related').then((comp) => comp.Editor),
  {
    ssr: false,
  }
)

export default function EditorPage({
  title,
  editor,
}: {
  title: string
  editor: string
}) {
  const { getBroadcast } = useBroadcast()

  useEffect(() => {
    getBroadcast(editor)
  }, [])

  return (
    <SocketProvider>
      <Head>
        <title>{title}</title>
      </Head>
      <Editor />
    </SocketProvider>
  )
}

export async function getServerSideProps({ query }) {
  const broadcast = await prisma.broadcast.findFirst({
    where: { editor: query.editor },
    select: {
      title: true,
      editor: true,
    },
  })

  if (!broadcast) {
    return {
      redirect: '/',
    }
  }

  return {
    props: broadcast,
  }
}
