import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function editor_all(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { editor } = infos
  const { search } = JSON.parse(request.body)

  if (!editor) return response.status(401).json({ error: 'Unauthorized' })

  const broadcast = await prisma.broadcast.findUnique({
    where: {
      editor,
    },
  })

  if (!broadcast) return response.status(401).json({ error: 'Unauthorized' })

  const editors = await prisma.editor.findMany({
    where: {
      broadcast_id: broadcast.id,
      name: {
        contains: search,
      },
    },
    take: 20,
    orderBy: {
      name: 'asc',
    },
  })

  return response.status(200).json(editors)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, editor_all)

export default helper
