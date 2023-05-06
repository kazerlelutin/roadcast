import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function broadcast_save_history(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { myLocalId } = infos
  const { reader } = JSON.parse(request.body)
  const broadcast = await prisma.broadcast.findFirst({
    where: {
      reader,
    },
  })

  if (!broadcast) return response.status(200).json([])

  const history = await prisma.userBroadcastHistory.findFirst({
    where: {
      broadcast_id: broadcast.id,
      user_id: myLocalId,
    },
  })

  if (!history)
    await prisma.userBroadcastHistory.create({
      data: {
        broadcast_id: broadcast.id,
        user_id: myLocalId,
      },
    })

  return response.status(200).json([])
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, broadcast_save_history)

export default helper
