import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/db'
import { v4 as uuidv4 } from 'uuid'
import { generateRandomCode } from '@/utils'
import { ScheduleCtx } from '@/types'
import { scheduleMiddleWare } from '@/middlewares/schedule.middleware'

export async function schedule_create_broadcast(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: ScheduleCtx
) {
  const { id } = JSON.parse(request.body)

  if (!id) return response.status(400).json({ error: 'ID is required' })

  const schedule = await prisma.schedule.findUnique({
    where: {
      id,
    },
    include: {
      broadcast: true,
    },
  })

  if (!schedule)
    return response.status(400).json({ error: 'Schedule not found' })

  if (schedule.broadcast) return response.status(200).json(schedule.broadcast)
  const prefix = uuidv4()
  const broadcast = await prisma.broadcast.create({
    data: {
      title: schedule.subject,
      prefix,
      editor: prefix + generateRandomCode(63),
      reader: prefix + generateRandomCode(63),
      chronicles: {
        create: {
          title: 'Chronicle 1',
          position: 0,
        },
      },
    },
  })

  await prisma.schedule.update({
    where: {
      id,
    },
    data: {
      broadcast_id: broadcast.id,
    },
  })

  return response.status(200).json(broadcast)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  scheduleMiddleWare(request, response, schedule_create_broadcast)

export default helper
