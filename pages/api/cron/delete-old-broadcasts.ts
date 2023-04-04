import { prisma } from '../../../db/db'
import { NextApiRequest, NextApiResponse } from 'next'
import S3 from '../../../utils/bucket'

export default async function DeleteOldBroadcasts(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  const date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 45)
  const broadcasts = await prisma.broadcast.findMany({
    where: {
      updatedAt: {
        lte: date,
      },
    },
    include: {
      chronicles: {
        include: {
          medias: true,
        },
      },
    },
  })

  //delete medias from S3
  const s3 = new S3()
  for (const broadcast of broadcasts) {
    for (const chronicle of broadcast.chronicles) {
      for (const media of chronicle.medias) {
        s3.deleteMedia(media.url)
      }
    }
  }

  const deletedEditors = prisma.editor.deleteMany({
    where: {
      broadcast_id: {
        in: broadcasts.map((b) => b.id),
      },
    },
  })

  const deletedMedias = prisma.editor.deleteMany({
    where: {
      broadcast_id: {
        in: broadcasts.map((b) => b.id),
      },
    },
  })

  const deletedChronicles = prisma.chronicle.deleteMany({
    where: {
      broadcast_id: {
        in: broadcasts.map((b) => b.id),
      },
    },
  })

  const deletedBroadcasts = prisma.broadcast.deleteMany({
    where: {
      id: {
        in: broadcasts.map((b) => b.id),
      },
    },
  })

  const res = await prisma.$transaction([
    deletedEditors,
    deletedMedias,
    deletedChronicles,
    deletedBroadcasts,
  ])

  return response.json(res)
}
