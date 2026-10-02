import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'

export default async function broadcast_findone(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { editor, reader } = JSON.parse(request.body || '{}')

  if (editor) {

    //Update the date for extended life of the broadcast
    await prisma.broadcast.update({
      where: {
        editor,
      },
      data: {
        updatedAt: new Date(),
      },

    })

    const broadcast = await prisma.broadcast.findFirst({
      where: {
        editor,
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

  return response.status(404).json({ error: 'Not found' })
}
