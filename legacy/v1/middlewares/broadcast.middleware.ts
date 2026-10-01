import { NextApiRequest, NextApiResponse } from 'next'
import { getBase64toObject } from '@/utils'

export async function broadcastMiddleWare(
  request: NextApiRequest,
  response: NextApiResponse,
  helper: Function
) {
  const { headers } = request
  if (!headers?.['x-info'])
    return response.status(401).json({ error: 'no token' })
  const xInfo = getBase64toObject(headers['x-info'] as string)

  return helper(request, response, xInfo)
}
