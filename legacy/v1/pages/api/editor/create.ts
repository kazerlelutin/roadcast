import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx, ScheduleCtx } from '@/types'

async function editor_create(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx | ScheduleCtx
) {
  const { editor } = infos
  const { chronicleId, scheduleId, name } = JSON.parse(request.body)

  if (!editor || !name)
    return response.status(401).json({ error: 'Unauthorized' })

  if (chronicleId) {
    const broadcast = await prisma.broadcast.findUnique({
      where: {
        editor,
      },
    })

    if (!broadcast) return response.status(401).json({ error: 'Unauthorized' })

    const chronicle = await prisma.chronicle.findUnique({
      where: {
        id: chronicleId,
      },
    })

    if (!chronicle || chronicle.broadcast_id !== broadcast.id)
      return response.status(401).json({ error: 'Unauthorized' })

    const newEditor = await prisma.editor.create({
      data: {
        name,
        broadcast_id: broadcast.id,
        chronicles: {
          connect: {
            id: chronicleId,
          },
        },
      },
    })

    return response.status(200).json(newEditor)
  }

  if (scheduleId) {
    const scheduleAccount = await prisma.scheduleAccount.findUnique({
      where: {
        editor,
      },
    })

    if (!scheduleAccount)
      return response.status(401).json({ error: 'Unauthorized' })

    const schedule = await prisma.schedule.findUnique({
      where: {
        id: scheduleId,
      },
    })

    if (!schedule) return response.status(401).json({ error: 'Unauthorized' })

    const newEditor = await prisma.editor.create({
      data: {
        name,
        scheduleId: schedule.id,
        scheduleAccountId: scheduleAccount.id,
      },
    })

    return response.status(200).json(newEditor)
  }

  return response.status(400).json({ error: 'no id' })
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, editor_create)

export default helper
