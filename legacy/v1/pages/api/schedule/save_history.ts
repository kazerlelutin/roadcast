import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function schedule_account_save_history(
  _request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  //TODO explain : save only editor history
  const { myLocalId, editor } = infos
  const broadcast = await prisma.scheduleAccount.findFirst({
    where: {
      editor,
    },
  })

  if (!broadcast) return response.status(200).json([])

  const history = await prisma.userScheduleHistory.findFirst({
    where: {
      schedule_id: broadcast.id,
      user_id: myLocalId,
    },
  })

  if (!history)
    await prisma.userScheduleHistory.create({
      data: {
        schedule_id: broadcast.id,
        user_id: myLocalId,
      },
    })

  return response.status(200).json([])
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, schedule_account_save_history)

export default helper
