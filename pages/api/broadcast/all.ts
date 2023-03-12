import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import { authMiddleWare } from '../../../middlewares/auth.middleware'

//NO USER AUTHENTICATION HERE
async function broadcast_all(
  _request: NextApiRequest,
  response: NextApiResponse,
  user: User
) {
  if (!user) return response.status(401).json({ error: 'Unauthorized' })
  const broadcasts = await prisma.broadcast.findMany({
    where: {
      OR: [
        {
          user_id: user.id,
        },
        {
          chronicles: {
            some: {
              editorId: user.id,
            },
          },
        },
      ],
    },
  })

  return response.status(200).json(broadcasts)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  authMiddleWare(request, response, broadcast_all)

export default helper
