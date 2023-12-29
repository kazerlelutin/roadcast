import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { trigger } from '../../../services/trigger'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { TriggerTypes } from '@/components'

async function chronicle_update_field(request: NextApiRequest, response: NextApiResponse, infos: BroadcastCtx) {
  const { editor, myLocalId } = infos
  const { chronicle } = JSON.parse(request.body)

  if (!chronicle) return response.status(400).json({ error: 'Missing chronicle' })
  const { id: chronicleId, title, text, status, source } = chronicle

  if (!editor && chronicleId) return response.status(401).json({ error: 'Unauthorized' })

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
      text,
      status,
      source: /^(http|https):\/\//.test(source) ? source : null,
    },
  })

  await trigger(broadcast.reader, TriggerTypes.CHRONICLE, {
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
  broadcastMiddleWare(request, response, chronicle_update_field)

export default helper
