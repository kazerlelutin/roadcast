import { SocketProvider } from '@/components'
import { BroadcastProvider } from '@/entities'
import { Slider } from '@/pages_related'
import { prisma } from '@/db'

export default function SliderPage({ broadcast }: { broadcast: string }) {
  return (
    <BroadcastProvider broadcast={JSON.parse(broadcast)}>
      <SocketProvider>
        <Slider />
      </SocketProvider>
    </BroadcastProvider>
  )
}

export async function getServerSideProps({ query, req }) {
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

  return {
    props: { broadcast: JSON.stringify(broadcast) },
  }
}
