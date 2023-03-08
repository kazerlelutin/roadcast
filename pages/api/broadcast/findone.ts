import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'

//NO USER AUTHENTICATION HERE
export default async function broadcast_findone(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log('request.body', request.body)
  const { admin, editor, reader } = JSON.parse(request.body)

  if (admin) {
    const broadcast = await prisma.broadcast.findFirst({
      where: {
        admin,
      },
    })
    if (broadcast) return response.status(200).json(broadcast)
  }

  return response.status(404).json({ error: 'Not found' })
}
