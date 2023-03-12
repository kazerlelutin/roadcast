import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'

//NO USER AUTHENTICATION HERE
export default async function broadcast_findone(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { admin, editor, reader } = JSON.parse(request.body)

  //TODO ne pas passer les lien de l'admin dans le broadcast
  if (admin) {
    const broadcast = await prisma.broadcast.findFirst({
      where: {
        admin,
      },
      include: {
        chronicles: true,
      },
    })
    if (broadcast) return response.status(200).json(broadcast)
  }

  if (editor) {
    const broadcast = await prisma.broadcast.findFirst({
      where: {
        editor,
      },
      select: {
        id: true,
        reader: true,
        createdAt: true,
        chronicles: true,
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
