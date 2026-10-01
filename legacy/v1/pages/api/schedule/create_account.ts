import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/db'
import { v4 as uuidv4 } from 'uuid'
import { generateRandomCode } from '@/utils'
import { ScheduleCtx } from '@/types'
import { scheduleMiddleWare } from '@/middlewares/schedule.middleware'

export async function schedule_create_account(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: ScheduleCtx
) {
  const { title } = JSON.parse(request.body)

  if (!title) return response.status(400).json({ error: 'Title is required' })

  const prefix = uuidv4()
  const newScheduleAccount = await prisma.scheduleAccount.create({
    data: {
      title,
      prefix,
      user_id: infos.myLocalId,
      editor: prefix + generateRandomCode(63),
      reader: prefix + generateRandomCode(63),
      schedules: {
        create: {
          subject: 'Schedule 1',
          info: '',
        },
      },
    },
  })

  return response.status(200).json(newScheduleAccount)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  scheduleMiddleWare(request, response, schedule_create_account)

export default helper
