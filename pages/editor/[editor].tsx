import { SocketProvider } from '@/components'
import {
  BroadcastFocusModeProvider,
  BroadcastProvider,
  BroadcastReadModeProvider,
  ChronicleRefreshButtonProvider,
  ChronicleToScreenProvider,
  ChroniclesProvider,
  EditorsProvider,
} from '@/entities'
import { prisma } from '@/db'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Editor = dynamic(
  () => import('@/pages_related').then((comp) => comp.Editor),
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
                  <EditorsProvider>
                    <Head>
                      <title>{title}</title>
                    </Head>
                    <Editor />
                  </EditorsProvider>
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
    where: { editor: query.editor },
    include: {
      chronicles: {
        include: {
          medias: true,
          editor: true,
        },
      },
    },
  })

  if (!broadcast) {
    return {
      redirect: '/',
    }
  }

  return {
    props: { broadcast: JSON.stringify(broadcast), title: broadcast.title },
  }
}
