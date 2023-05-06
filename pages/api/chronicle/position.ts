import { NextApiRequest, NextApiResponse } from 'next'
import { TriggerTypes } from '../../../components/socket'
import { prisma } from '../../../db/db'
import { trigger } from '../../../services/trigger'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function chronicle_position(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { editor, myLocalId } = infos
  const { position, id } = JSON.parse(request.body)

  if (!editor && !position && !id)
    return response.status(401).json({ error: 'Unauthorized' })

  const broadcast = await prisma.broadcast.findUnique({
    where: {
      editor: editor,
    },
    select: {
      id: true,
      reader: true,
      editor: true,
    },
  })

  await prisma.chronicle.updateMany({
    where: {
      broadcast_id: broadcast.id,
      position: {
        gte: position,
      },
    },
    data: {
      position: {
        increment: 1,
      },
    },
  })

  //create after for no affectation of position

  await prisma.chronicle.update({
    where: {
      id,
    },
    data: {
      position,
    },
  })

  trigger(broadcast.reader, TriggerTypes.CHRONICLE, {
    message: 'refresh',
    id: myLocalId,
  })

  return response.status(200).json(
    await prisma.chronicle.findMany({
      where: {
        broadcast_id: broadcast.id,
      },
      orderBy: {
        position: 'asc',
      },
      include: {
        medias: true,
        editor: true,
      },
    })
  )
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, chronicle_position)

export default helper
