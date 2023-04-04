import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'

export default async function chronicle_all(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { reader } = JSON.parse(request.body)

  if (!reader) return response.status(401).json({ error: 'Unauthorized' })

  const broadcast = await prisma.broadcast.findUnique({
    where: {
      reader,
    },
    select: {
      chronicles: true,
    },
  })

  if (!broadcast) return response.status(401).json({ error: 'Unauthorized' })

  return response
    .status(200)
    .json(broadcast.chronicles.sort((a, b) => a.position - b.position))
}
