import { SocketProvider } from '@/components'
import {
  BroadcastFocusModeProvider,
  BroadcastProvider,
  BroadcastReadModeProvider,
  ChronicleRefreshButtonProvider,
  ChronicleToScreenProvider,
  ChroniclesProvider,
} from '@/entities'
import { prisma } from '@/db'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Reader = dynamic(
  () => import('@/pages_related').then((comp) => comp.Reader),
  {
    ssr: false,
  }
)

export default function EditorPage({
  broadcast,
  title,
}: {
  broadcast: string
  title: string
}) {
  return (
    <ChronicleToScreenProvider>
      <BroadcastReadModeProvider>
        <BroadcastFocusModeProvider>
          <BroadcastProvider broadcast={JSON.parse(broadcast)}>
            <SocketProvider>
              <ChronicleRefreshButtonProvider>
                <ChroniclesProvider>
                  <Head>
                    <title>{title}</title>
                  </Head>
                  <Reader />
                </ChroniclesProvider>
              </ChronicleRefreshButtonProvider>
            </SocketProvider>
          </BroadcastProvider>
        </BroadcastFocusModeProvider>
      </BroadcastReadModeProvider>
    </ChronicleToScreenProvider>
  )
}

export async function getServerSideProps({ query }) {
  const broadcast = await prisma.broadcast.findFirst({
    where: { reader: query.reader },
    include: {
      chronicles: {
        include: {
          medias: true,
          editor: true,
        },
      },
    },
  })

  delete broadcast.editor
  if (!broadcast) {
    return {
      redirect: '/',
    }
  }

  return {
    props: { broadcast: JSON.stringify(broadcast), title: broadcast.title },
  }
}
