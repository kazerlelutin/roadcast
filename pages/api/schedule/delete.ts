import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/db'
import { ScheduleCtx } from '@/types'
import { scheduleMiddleWare } from '@/middlewares/schedule.middleware'

export async function schedule_delete(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: ScheduleCtx
) {
  const { id } = JSON.parse(request.body)

  if (!id) return response.status(400).json({ error: 'ID is required' })

  const scheduleAccount = await prisma.scheduleAccount.findFirst({
    where: {
      editor: infos.editor,
    },
  })

  if (!scheduleAccount)
    return response.status(400).json({ error: 'Schedule account not found' })

  // not delete broadcast, cron make it, guests and editors can stay on schedule account
  await prisma.schedule.delete({
    where: {
      id,
    },
  })

  return response.status(200).json({ message: 'Schedule deleted' })
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  scheduleMiddleWare(request, response, schedule_delete)

export default helper
