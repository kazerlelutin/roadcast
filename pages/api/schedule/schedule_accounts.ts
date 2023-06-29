import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function schedule_accounts(
  _request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const history = await prisma.userScheduleHistory.findMany({
    where: {
      user_id: infos.myLocalId,
    },
    select: {
      scheduleAccounts: {
        select: {
          id: true,
          editor: true,
          title: true,
          createdAt: true,
        },
      },
    },
  })

  return response.status(200).json(history.map((h) => h.scheduleAccounts))
}
const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, schedule_accounts)

export default helper
