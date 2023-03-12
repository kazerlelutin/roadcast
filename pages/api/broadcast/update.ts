import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleWare } from '../../../middlewares/auth.middleware'
import { prisma } from '../../../db/db'

async function broadcast_update(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = JSON.parse(request.body)

  if (!id) return response.status(400).json({ error: 'Id is required' })

  const data = { ...JSON.parse(request.body) }
  delete data.id

  const broadcast = await prisma.broadcast.update({
    where: { admin: id },
    data,
  })

  return response.status(200).json(broadcast)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  authMiddleWare(request, response, broadcast_update)

export default helper
