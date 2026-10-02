import { SocketProvider } from '@/components'
import { prisma } from '@/db'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { ScheduleAccountProvider } from '@/entities'
import { ScheduleStatus } from '@prisma/client'

const ScheduleEditor = dynamic(
  () => import('@/pages_related').then((comp) => comp.ScheduleEditor),
  {
    ssr: false,
  }
)

export default function ScheduleEditorPage({
  schedule,
  title,
}: {
  schedule: string
  title: string
}) {
  return (
    <ScheduleAccountProvider scheduleAccount={JSON.parse(schedule)}>
      <SocketProvider>
        <Head>
          <title>{title}</title>
        </Head>
        <ScheduleEditor />
      </SocketProvider>
    </ScheduleAccountProvider>
  )
}

export async function getServerSideProps({ query }) {
  const scheduleAccount = await prisma.scheduleAccount.findFirst({
    where: { editor: query.editor },
    include: {
      schedules: {
        include: {
          broadcast: true,
          guests: true,
          editors: true,
        },
      },
    },
  })

  if (!scheduleAccount) {
    return {
      redirect: '/',
    }
  }

  const statusOrder = [
    ScheduleStatus.progress,
    ScheduleStatus.project,
    ScheduleStatus.delayed,
    ScheduleStatus.done,
  ]

  const scheduleAccountToSend = {
    ...scheduleAccount,
    schedules: scheduleAccount.schedules.sort((a, b) => {
      //if status is different, sort by status
      if (a.status !== b.status) {
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      } else {
        //if status is the same, sort by start_at
        const aStartAt = a.start_at ? a.start_at.getTime() : 0
        const bStartAt = b.start_at ? b.start_at.getTime() : 0
        return aStartAt - bStartAt
      }
    }),
  }

  return {
    props: {
      schedule: JSON.stringify(scheduleAccountToSend),
      title: scheduleAccount.title,
    },
  }
}
