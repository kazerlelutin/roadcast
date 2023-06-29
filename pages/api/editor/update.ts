import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { trigger } from '../../../services/trigger'
import { TriggerTypes } from '../../../components/socket'

interface EditorUpdateBody {
  chronicleId?: string
  id?: string
  idsToDelete?: string[]
  idsToAdd?: string[]
  scheduleId?: string
}
async function editor_update(
  request: NextApiRequest,
  response: NextApiResponse,
  info: BroadcastCtx
) {
  const { editor, myLocalId, reader } = info
  const {
    chronicleId,
    id,
    idsToDelete,
    idsToAdd,
    scheduleId,
  }: EditorUpdateBody = JSON.parse(request.body)

  if (!editor) return response.status(401).json({ error: 'Unauthorized' })

  if (scheduleId) {
    const scheduleAccount = await prisma.scheduleAccount.findUnique({
      where: {
        editor,
      },
    })

    if (!scheduleAccount)
      return response.status(401).json({ error: 'Unauthorized' })

    const schedule = await prisma.schedule.findUnique({
      where: {
        id: scheduleId,
      },
    })

    if (!schedule || !scheduleAccount.id)
      return response.status(401).json({ error: 'Unauthorized' })

    await prisma.editor.updateMany({
      where: {
        id: {
          in: idsToDelete || [],
        },
      },
      data: {
        scheduleId: null,
      },
    })

    await prisma.editor.updateMany({
      where: {
        id: {
          in: idsToAdd || [],
        },
      },
      data: {
        scheduleId: schedule.id,
        scheduleAccountId: scheduleAccount.id,
      },
    })

    trigger(reader, TriggerTypes.SCHEDULE, {
      message: scheduleId,
      id: myLocalId,
    })

    trigger(editor, TriggerTypes.SCHEDULE, {
      message: 'refresh',
      id: myLocalId,
    })

    const editors = await prisma.editor.findMany({
      where: {
        scheduleId: schedule.id,
      },
    })

    return response.status(200).json(editors)
  }

  if (!chronicleId) return response.status(401).json({ error: 'Unauthorized' })

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
