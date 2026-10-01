import { prisma } from '@/db/db'
import { NextApiRequest, NextApiResponse } from 'next'
import S3 from '@/utils/bucket'

export default async function DeleteOldBroadcasts(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  //45 days ago
  const date = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365)
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
  const mediaIds: string[] = []
  const broadcastIds: string[] = broadcasts.map((b) => b.id)
  for (const broadcast of broadcasts) {
    for (const chronicle of broadcast.chronicles) {
      for (const media of chronicle.medias) {
        //s3.deleteMedia(media.url)
        mediaIds.push(media.id)
      }
    }
  }

  const deletedEditors = prisma.editor.deleteMany({
    where: {
      broadcast_id: {
        in: broadcastIds,
      },
    },
  })

  const deletedMedias = prisma.media.deleteMany({
    where: {
      id: {
        in: mediaIds,
      },
    },
  })

  const deletedUserBroadcastsHistory = prisma.userBroadcastHistory.deleteMany({
    where: {
      broadcast_id: {
        in: broadcastIds,
      },
    },
  })

  const deletedChroniclesHistory = prisma.chronicleHistory.deleteMany({
    where: {
      broadcast_id: {
        in: broadcastIds,
      },
    },
  })

  const deletedChronicles = prisma.chronicle.deleteMany({
    where: {
      broadcast_id: {
        in: broadcastIds,
      },
    },
  })

  const deletedBroadcasts = prisma.broadcast.deleteMany({
    where: {
      id: {
        in: broadcastIds,
      },
    },
  })

  const res = await prisma.$transaction([
    deletedEditors,
    deletedMedias,
    deletedUserBroadcastsHistory,
    deletedChroniclesHistory,
    deletedChronicles,
    deletedBroadcasts,
  ])

  const keys = [
    'deletedEditors',
    'deletedMedias',
    'deletedUserBroadcastsHistory',
    'deletedChroniclesHistory',
    'deletedChronicles',
    'deletedBroadcasts',
  ]

  return response.json(res.map((r, i) => ({ [keys[i]]: r })))
}
