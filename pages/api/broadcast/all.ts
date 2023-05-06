import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function broadcast_all(
  _request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const history = await prisma.userBroadcastHistory.findMany({
    where: {
      user_id: infos.myLocalId,
    },
    select: {
      broadcast: {
        select: {
          editor: true,
          title: true,
        },
      },
    },
  })

  return response.status(200).json(history.map((h) => h.broadcast))
}
const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, broadcast_all)

export default helper
