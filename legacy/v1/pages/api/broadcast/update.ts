import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'

async function broadcast_update(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { editor } = infos

  const data = { ...JSON.parse(request.body) }
  delete data.id

  const broadcast = await prisma.broadcast.update({
    where: { editor },
    data,
  })

  return response.status(200).json(broadcast)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, broadcast_update)

export default helper
