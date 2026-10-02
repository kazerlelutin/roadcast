import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/db'
import { ScheduleCtx } from '@/types'
import { scheduleMiddleWare } from '@/middlewares/schedule.middleware'
import { trigger } from '@/services/trigger'
import { TriggerTypes } from '@/components'

export async function schedule_update_info(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: ScheduleCtx
) {
  const { id, info } = JSON.parse(request.body)

  if (!info || !id)
    return response.status(400).json({ error: 'Info and id is required' })

  const scheduleAccount = await prisma.scheduleAccount.findFirst({
    where: {
      editor: infos.editor,
    },
  })

  if (!scheduleAccount)
    return response.status(400).json({ error: 'Schedule account not found' })

  const schedule = await prisma.schedule.update({
    where: {
      id,
    },
    data: {
      info,
    },
  })

  await trigger(infos.reader, TriggerTypes.SCHEDULE_ACCOUNT, {
    message: schedule.id,
    id: infos.myLocalId,
  })

  return response.status(200).json(schedule)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  scheduleMiddleWare(request, response, schedule_update_info)

export default helper
