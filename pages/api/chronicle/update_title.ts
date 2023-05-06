import { NextApiRequest, NextApiResponse } from 'next'
import { TriggerTypes } from '../../../components/socket'
import { prisma } from '../../../db/db'
import { trigger } from '../../../services/trigger'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function chronicle_title(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { editor, myLocalId } = infos
  const { title, id: chronicleId } = JSON.parse(request.body)

  if (!editor && !title && chronicleId)
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
      id: chronicleId,
    },
    data: {
      title,
    },
  })

  trigger(broadcast.reader, TriggerTypes.CHRONICLE, {
    message: chronicleId,
    id: myLocalId,
  })

  return response.status(200).json(
    await prisma.chronicle.findUnique({
      where: { id: chronicleId },
      include: {
        medias: true,
        editor: true,
      },
    })
  )
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, chronicle_title)

export default helper
