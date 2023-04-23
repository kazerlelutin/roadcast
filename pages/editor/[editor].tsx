import { SocketProvider } from '../../components/socket'
import {
  BroadcastFocusModeProvider,
  BroadcastProvider,
  BroadcastReadModeProvider,
} from '../../entities/broadcast/broadcast'
import {
  ChronicleRefreshButtonProvider,
  ChronicleToScreenProvider,
  ChroniclesProvider,
} from '../../entities/chronicle/chronicle'
import { EditorsProvider } from '../../entities/editor/editor'
import {} from '../../pages_related/editor/editor'
import { prisma } from '../../db/db'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Editor = dynamic(
  () => import('../../pages_related/editor/editor').then((comp) => comp.Editor),
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
    <SocketProvider>
      <ChronicleToScreenProvider>
        <BroadcastReadModeProvider>
          <BroadcastFocusModeProvider>
            <BroadcastProvider broadcast={JSON.parse(broadcast)}>
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
            </BroadcastProvider>
          </BroadcastFocusModeProvider>
        </BroadcastReadModeProvider>
      </ChronicleToScreenProvider>
    </SocketProvider>
  )
}

export async function getServerSideProps({ query, req }) {
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

  return {
    props: { broadcast: JSON.stringify(broadcast), title: broadcast.title },
  }
}
