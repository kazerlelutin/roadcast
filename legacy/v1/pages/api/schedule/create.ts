import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/db'
import { ScheduleCtx } from '@/types'
import { scheduleMiddleWare } from '@/middlewares/schedule.middleware'

export async function schedule_create(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: ScheduleCtx
) {
  const { subject } = JSON.parse(request.body)

  if (!subject)
    return response.status(400).json({ error: 'Subject is required' })

  const scheduleAccount = await prisma.scheduleAccount.findFirst({
    where: {
      editor: infos.editor,
    },
  })

  if (!scheduleAccount)
    return response.status(400).json({ error: 'Schedule account not found' })

  const newSchedule = await prisma.schedule.create({
    data: {
      subject,
      info: '',
      account_id: scheduleAccount.id,
    },
    include: {
      broadcast: true,
      guests: true,
      editors: true,
    },
  })

  return response.status(200).json(newSchedule)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  scheduleMiddleWare(request, response, schedule_create)

export default helper
