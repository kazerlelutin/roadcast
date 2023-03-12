import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'

export default async function chronicle_create(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { editor, position } = JSON.parse(request.body)

  if (!editor && !position)
    return response.status(401).json({ error: 'Unauthorized' })

  const broadcast = await prisma.broadcast.findUnique({
    where: {
      editor: editor,
    },
    select: {
      id: true,
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

  return response.status(200).json(
    await prisma.chronicle.findMany({
      where: {
        broadcast_id: broadcast.id,
      },
      orderBy: {
        position: 'asc',
      },
    })
  )
}
