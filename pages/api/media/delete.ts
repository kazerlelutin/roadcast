import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { trigger } from '../../../services/trigger'
import { TriggerTypes } from '../../../components/socket'

async function media_delete(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { id, chronicleId, myLocalId } = JSON.parse(request.body)
  const { editor } = infos

  const broadcast = await prisma.broadcast.findFirst({
    where: {
      editor,
    },
    include: {
      chronicles: {
        where: {
          id: chronicleId,
        },
      },
    },
  })

  if (broadcast.chronicles.find((c) => c.id === chronicleId) === undefined)
    return response.status(400).json({ message: 'Chronicle not found' })

  await prisma.media.deleteMany({
    where: {
      id,
      chronicle_id: chronicleId,
    },
  })

  await trigger(broadcast.reader, TriggerTypes.CHRONICLE, {
    message: chronicleId,
    id: myLocalId,
  })

  return response.status(200).json({ message: 'ok' })
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, media_delete)

export default helper
