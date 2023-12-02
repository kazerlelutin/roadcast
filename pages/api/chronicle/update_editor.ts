import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { trigger } from '../../../services/trigger'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { TriggerTypes } from '@/components'

async function chronicle_update_editor(request: NextApiRequest, response: NextApiResponse, infos: BroadcastCtx) {
  const { editor, myLocalId } = infos
  const { chronicleId, editor: editorForChronicle } = JSON.parse(request.body)

  if (!editor) return response.status(401).json({ error: 'Unauthorized' })
  if (!chronicleId) return response.status(400).json({ error: 'Missing chronicle' })

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
      editorId: editorForChronicle.id,
    },
  })

  await trigger(broadcast.reader, TriggerTypes.CHRONICLE, {
    message: chronicleId,
    id: myLocalId,
  })

  return response.status(200).json({ message: 'ok' })
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, chronicle_update_editor)

export default helper
