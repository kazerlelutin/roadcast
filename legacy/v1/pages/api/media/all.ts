import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'

export default async function media_all(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { reader } = request.body ? JSON.parse(request.body) : { reader: null }

  //don't create error if reader is not provided
  if (!reader) return response.status(200).json([])

  const broadcast = await prisma.broadcast.findUnique({
    where: {
      reader,
    },
    select: {
      id: true,
      chronicles: {
        select: {
          medias: true,
        },
      },
    },
  })

  if (!broadcast) return response.status(401).json({ error: 'Unauthorized' })

  const medias = await prisma.media.findMany({
    where: {
      id: {
        in: broadcast?.chronicles
          .map((c) => c.medias.map((media) => media.chronicle_id))
          .reduce((a, b) => a.concat(b), []),
      },
    },
  })
  return response.status(200).json(medias)
}
