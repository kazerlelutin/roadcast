import { NextApiRequest, NextApiResponse } from 'next'
import { TriggerTypes } from '../../../components/socket'
import { prisma } from '../../../db/db'
import { trigger } from '../../../services/trigger'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function chronicle_delete(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { editor, myLocalId } = infos
  const { id } = JSON.parse(request.body)

  if (!id) return response.status(401).json({ error: 'Unauthorized' })

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

  const chronicle = await prisma.chronicle.findFirst({
    where: {
      id,
      broadcast_id: broadcast.id,
    },
  })

  const chroniclePosition = chronicle.position

  const deleteMedias = prisma.media.deleteMany({
    where: {
      chronicle: {
        id,
      },
    },
  })

  const deleteChronicle = prisma.chronicle.delete({
    where: {
      id,
    },
  })

  const updateChronicles = prisma.chronicle.updateMany({
    where: {
      broadcast_id: broadcast.id,
      position: {
        gt: chroniclePosition,
      },
    },
    data: {
      position: {
        decrement: 1,
      },
    },
  })

  await prisma.$transaction([deleteMedias, deleteChronicle, updateChronicles])

  trigger(broadcast.reader, TriggerTypes.CHRONICLE, {
    message: 'refresh',
    id: myLocalId,
  })

  trigger(broadcast.editor, TriggerTypes.CHRONICLE, {
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
    })
  )
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, chronicle_delete)

export default helper
