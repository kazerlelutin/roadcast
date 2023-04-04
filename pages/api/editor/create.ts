import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function editor_create(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { editor } = infos
  const { chronicleId, name } = JSON.parse(request.body)

  if (!editor || !chronicleId)
    return response.status(401).json({ error: 'Unauthorized' })

  const broadcast = await prisma.broadcast.findUnique({
    where: {
      editor,
    },
  })

  if (!broadcast) return response.status(401).json({ error: 'Unauthorized' })

  const chronicle = await prisma.chronicle.findUnique({
    where: {
      id: chronicleId,
    },
  })

  if (!chronicle || chronicle.broadcast_id !== broadcast.id)
    return response.status(401).json({ error: 'Unauthorized' })

  const newEditor = await prisma.editor.create({
    data: {
      name,
      broadcast_id: broadcast.id,
      chronicles: {
        connect: {
          id: chronicleId,
        },
      },
    },
  })

  return response.status(200).json(newEditor)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, editor_create)

export default helper
