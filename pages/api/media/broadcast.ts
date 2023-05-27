import { NextApiRequest, NextApiResponse } from 'next'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { trigger } from '../../../services/trigger'
import { TriggerTypes } from '../../../components/socket'

async function media_broadcast(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { media, myLocalId } = JSON.parse(request.body)
  const { reader } = infos

  trigger(reader, TriggerTypes.SLIDER, {
    message: media,
    id: myLocalId || '0',
  })

  return response.status(200).json({ message: 'ok' })
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, media_broadcast)

export default helper
