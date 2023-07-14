import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { ScheduleCtx } from '@/types'

async function schedule_guests(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx | ScheduleCtx
) {
  const { editor } = infos
  const { search } = JSON.parse(request.body)

  if (!editor) return response.status(401).json({ error: 'Unauthorized' })

  const entityWhere = { where: { editor } }
  const scheduleAccount = await prisma.scheduleAccount.findUnique({
    ...entityWhere,
  })

  if (!scheduleAccount)
    return response.status(401).json({ error: 'Unauthorized' })

  const editors = await prisma.guest.findMany({
    where: {
      name: {
        contains: search,
      },
      scheduleAccountId: scheduleAccount.id,
    },
    take: 20,
    orderBy: {
      name: 'asc',
    },
  })

  return response.status(200).json(editors)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, schedule_guests)

export default helper
