import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleWare } from '../../../middlewares/auth.middleware'
import { prisma } from '../../../db/db'
import { v4 as uuidv4 } from 'uuid'
import { generateRandomCode } from '../../../utils/generate_code'

async function broadcast_create(
  request: NextApiRequest,
  response: NextApiResponse,
  user: User
) {
  const { title } = JSON.parse(request.body)

  if (!title) return response.status(400).json({ error: 'Title is required' })

  const prefix = uuidv4()
  const newBroadcast = await prisma.broadcast.create({
    data: {
      title,
      prefix,
      admin: prefix + generateRandomCode(63),
      editor: prefix + generateRandomCode(63),
      reader: prefix + generateRandomCode(63),
      owner: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  return response.status(200).json(newBroadcast)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  authMiddleWare(request, response, broadcast_create)

export default helper
