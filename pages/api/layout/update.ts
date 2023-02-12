import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleWare } from '../../../middlewares/auth.middleware'
import { prisma } from '../../../db/db'

async function layout_update(
  request: NextApiRequest,
  response: NextApiResponse,
  user: User
) {
  //prevent if no user layout
  const layout = prisma.layout.findFirst({
    where: {
      id: request.body.id,
      user_id: user.id,
    },
  })

  if (!layout) return response.status(400).json({ error: 'no layout' })
  const { layout: newLayout, id } = JSON.parse(request.body)

  await prisma.layout.update({
    where: {
      id: id,
    },
    data: {
      layout: newLayout,
    },
  })

  return response.status(200).send('layout updated')
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  authMiddleWare(request, response, layout_update)

export default helper
