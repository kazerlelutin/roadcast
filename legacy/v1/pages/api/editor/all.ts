import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { ScheduleCtx } from '@/types'

async function editor_all(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx | ScheduleCtx
) {
  const { editor } = infos
  const { search, isSchedule } = JSON.parse(request.body)

  if (!editor) return response.status(401).json({ error: 'Unauthorized' })

  const entityWhere = { where: { editor } }
  const entity = isSchedule
    ? await prisma.scheduleAccount.findUnique({ ...entityWhere })
    : await prisma.broadcast.findUnique({ ...entityWhere })

  if (!entity) return response.status(401).json({ error: 'Unauthorized' })

  const where: {
    name: {
      contains: string
    }
    scheduleAccountId?: string
    broadcast_id?: string
  } = {
    name: {
      contains: search,
    },
  }

  if (isSchedule) {
    where.scheduleAccountId = entity.id
  } else {
    where.broadcast_id = entity.id
  }
  const editors = await prisma.editor.findMany({
    where,
    take: 20,
    orderBy: {
      name: 'asc',
    },
  })

  return response.status(200).json(editors)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, editor_all)

export default helper
