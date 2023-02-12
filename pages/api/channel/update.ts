import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleWare } from '../../../middlewares/auth.middleware'
import { prisma } from '../../../db/db'

async function layout_update(
  request: NextApiRequest,
  response: NextApiResponse,
  user: User
) {
  const { current_channel } = JSON.parse(request.body)

  const newUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      current_channel,
    },
  })
  return response.status(200).send({
    current_channel: newUser.current_channel,
  })
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  authMiddleWare(request, response, layout_update)

export default helper
