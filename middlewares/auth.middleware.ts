import { NextApiRequest, NextApiResponse } from 'next'
import { JWT_TOKEN } from '../utils/constants'
import jwt from 'jsonwebtoken'
import { prisma } from '../db/db'

export async function authMiddleWare(
  request: NextApiRequest,
  response: NextApiResponse,
  helper: Function
) {
  const { headers } = request
  if (!headers.authorization)
    return response.status(401).json({ error: 'no token' })
  const token = headers.authorization.split(' ')[1]
  if (!token) return response.status(401).json({ error: 'no token' })
  try {
    const decodedToken = jwt.verify(token, JWT_TOKEN)
    if (!decodedToken) return response.status(401).json({ error: 'no token' })
    if (typeof decodedToken === 'string')
      return response.status(401).json({ error: 'no token' })

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
    })
    if (!user) return response.status(401).json({ error: 'no user' })
    return helper(request, response, user)
  } catch (e) {
    return response.status(401).json({ error: 'no token' })
  }
}
