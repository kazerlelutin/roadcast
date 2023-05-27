import { SocketProvider } from '../../components/socket'
import { BroadcastProvider } from '../../entities/broadcast/broadcast'
import { Slider } from '../../pages_related/slider/slider'

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
