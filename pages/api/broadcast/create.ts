import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/db'
import { v4 as uuidv4 } from 'uuid'
import { generateRandomCode } from '@/utils'

export default async function broadcast_create(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { title } = JSON.parse(request.body)

  if (!title) return response.status(400).json({ error: 'Title is required' })

  const prefix = uuidv4()
  const newBroadcast = await prisma.broadcast.create({
    data: {
      title,
      prefix,
      editor: prefix + generateRandomCode(63),
      reader: prefix + generateRandomCode(63),
      chronicles: {
        create: {
          title: 'Chronicle 1',
          position: 0,
        },
      },
    },
  })

  return response.status(200).json(newBroadcast)
}
