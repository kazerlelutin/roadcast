import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { trigger } from '../../../services/trigger'
import { TriggerTypes } from '../../../components/socket'

async function editor_update(
  request: NextApiRequest,
  response: NextApiResponse,
  info: BroadcastCtx
) {
  const { editor, myLocalId, reader } = info
  const { chronicleId, id } = JSON.parse(request.body)

  if (!editor || !chronicleId)
    return response.status(401).json({ error: 'Unauthorized' })

  const broadcast = await prisma.broadcast.findUnique({
    where: {
      editor,
    },
  })

  if (!broadcast) return response.status(401).json({ error: 'Unauthorized' })

  const chronicle = await prisma.chronicle.update({
    where: {
      id: chronicleId,
    },
    include: {
      editor: true,
    },
    data: {
      editor: {
        connect: {
          id,
        },
      },
    },
  })

  trigger(reader, TriggerTypes.CHRONICLE, {
    message: chronicleId,
    id: myLocalId,
  })

  trigger(editor, TriggerTypes.CHRONICLE, {
    message: 'refresh',
    id: myLocalId,
  })

  return response.status(200).json(chronicle.editor)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, editor_update)

export default helper
