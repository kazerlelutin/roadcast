import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'

export default async function broadcast_findone(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { editor, reader } = JSON.parse(request.body)

  if (editor) {
    //Update the date for extended life of the broadcast
    const broadcast = await prisma.broadcast.update({
      where: {
        editor,
      },
      data: {
        updatedAt: new Date(),
      },
      include: {
        chronicles: {
          include: {
            medias: true,
            editor: true,
          },
        },
      },
    })

    if (broadcast) return response.status(200).json(broadcast)
  }

  if (reader) {
    const broadcast = await prisma.broadcast.findFirst({
      where: {
        reader,
      },
      select: {
        title: true,
        id: true,
        reader: true,
        createdAt: true,
        chronicles: true,
      },
    })
    if (broadcast) return response.status(200).json(broadcast)
  }

  return response.status(404).json({ error: 'Not found' })
}
