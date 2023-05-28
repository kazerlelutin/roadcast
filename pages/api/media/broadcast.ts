import { NextApiRequest, NextApiResponse } from 'next'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { triggerSlider } from '../../../services/trigger'

async function media_broadcast(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { media } = JSON.parse(request.body)
  const { reader } = infos

  await triggerSlider(reader, {
    message: media,
  })

  return response.status(200).json({ message: 'ok' })
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, media_broadcast)

export default helper
