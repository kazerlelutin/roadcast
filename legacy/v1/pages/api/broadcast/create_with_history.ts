import { NextApiRequest, NextApiResponse } from 'next'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { generateRandomCode } from '../../../utils/generate_code'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '../../../db/db'

async function create_with_history(
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
      title: true,
      chronicles: {
        select: {
          title: true,
          source: true,
          editor: {
            select: {
              name: true,
            },
          },
        },
      },
      chronicleHistories: {
        select: {
          title: true,
          source: true,
          editor: true,
        },
      },
    },
  })

  const prefix = uuidv4()

  const newBroadcast = await prisma.broadcast.create({
    data: {
      title: `new ${broadcast.title}`,
      prefix,
      editor: prefix + generateRandomCode(63),
      reader: prefix + generateRandomCode(63),
      chronicles: {
        create: {
          title: 'Chronicle 1',
          position: 0,
        },
      },
      chronicleHistories: {
        create: [
          ...broadcast.chronicles.map((chronicle) => ({
            title: chronicle.title,
            source: chronicle.source,
            editor: chronicle?.editor?.name || 'unknown',
          })),
          ...broadcast.chronicleHistories.map((history) => ({
            title: history.title,
            source: history.source,
            editor: history.editor,
          })),
        ].slice(0, 300),
      },
    },
  })
  return response.status(200).json(newBroadcast)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, create_with_history)

export default helper
