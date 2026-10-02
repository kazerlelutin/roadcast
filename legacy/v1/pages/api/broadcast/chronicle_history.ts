import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

async function chronicle_history(
  _request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { editor } = infos
  if (!editor) return response.status(401).json({ error: 'Unauthorized' })

  const broadcast = await prisma.broadcast.findUnique({
    where: {
      editor: editor,
    },
    select: {
      chronicleHistories: true,
    },
  })

  return response.status(200).json(broadcast.chronicleHistories)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, chronicle_history)

export default helper
