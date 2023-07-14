import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { ScheduleCtx } from '@/types'
import { scheduleMiddleWare } from '@/middlewares/schedule.middleware'

async function schedule_guest_create(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: ScheduleCtx
) {
  const { editor } = infos
  const { scheduleId, name } = JSON.parse(request.body)

  if (!editor || !name || !scheduleId)
    return response.status(401).json({ error: 'Unauthorized' })
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

  const newEditor = await prisma.guest.create({
    data: {
      name,
      schedule_id: schedule.id,
      scheduleAccountId: scheduleAccount.id,
    },
  })

  return response.status(200).json(newEditor)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  scheduleMiddleWare(request, response, schedule_guest_create)

export default helper
