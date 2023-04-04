import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'

export default async function broadcast_all(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { ids } = JSON.parse(request.body)

  const broadcasts = await prisma.broadcast.findMany({
    where: {
      editor: {
        in: ids,
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return response.status(200).json(broadcasts)
}
