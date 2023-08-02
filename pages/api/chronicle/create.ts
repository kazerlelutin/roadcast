import { NextApiRequest, NextApiResponse } from 'next'
import { TriggerTypes } from '../../../components/socket'
import { prisma } from '../../../db/db'
import { trigger } from '../../../services/trigger'

export default async function chronicle_create(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { editor, position, myLocalId } = JSON.parse(request.body)

  if (!editor && !position)
    return response.status(401).json({ error: 'Unauthorized' })

  const broadcast = await prisma.broadcast.findUnique({
    where: {
      editor: editor,
    },
    select: {
      id: true,
      reader: true,
    },
  })

  await prisma.chronicle.updateMany({
    where: {
      broadcast_id: broadcast.id,
      position: {
        gte: position,
      },
    },
    data: {
      position: {
        increment: 1,
      },
    },
  })

  //create after for no affectation of position
  await prisma.chronicle.create({
    data: {
      broadcast_id: broadcast.id,
      position: position,
      title: 'Untitled',
    },
  })

  await trigger(broadcast.reader, TriggerTypes.CHRONICLE, {
    message: 'refresh',
    id: myLocalId,
  })

  return response.status(200).json(
    await prisma.chronicle.findMany({
      where: {
        broadcast_id: broadcast.id,
      },
      include: {
        medias: true,
      },
      orderBy: {
        position: 'asc',
      },
    })
  )
}
