import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { trigger } from '../../../services/trigger'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { TriggerTypes } from '@/components'

async function chronicle_create_editor(request: NextApiRequest, response: NextApiResponse, infos: BroadcastCtx) {
  const { editor, myLocalId } = infos
  const body = JSON.parse(request.body)

  const { chronicleId, name }: { chronicleId: string; name: string } = body

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

  await trigger(broadcast.reader, TriggerTypes.CHRONICLE, {
    message: chronicleId,
    id: myLocalId,
  })

  return response.status(200).json({
    editor: newEditor,
    chronicle: await prisma.chronicle.findUnique({
      where: { id: chronicleId },
      include: {
        medias: true,
        editor: true,
      },
    }),
  })
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, chronicle_create_editor)

export default helper
