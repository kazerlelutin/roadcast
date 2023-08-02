import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../db/db'
import formidable from 'formidable'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import S3 from '../../../utils/bucket'
import { trigger } from '../../../services/trigger'
import { TriggerTypes } from '../../../components/socket'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function media_upload(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { editor, myLocalId } = infos
  const form = new formidable.IncomingForm()
  const fileContent: {
    content: Buffer
    name: string
    type: string
    size: number
    extension: string
    fields: { chronicleId: string; broadcastId: string }
  } = await new Promise((resolve, reject) => {
    form.parse(request, (_err, fields, files) => {
      const fileContentBuffer = fs.readFileSync(files.file.filepath)
      resolve({
        content: fileContentBuffer,
        name: files.file.originalFilename,
        type: files.file.mimetype,
        size: files.file.size,
        extension: files.file.originalFilename.split('.').pop(),
        fields,
      })

      reject()
    })
  })

  const { fields } = fileContent

  const broadcast = await prisma.broadcast.findFirst({
    where: {
      editor,
    },
  })

  if (!broadcast)
    return response.status(400).send({ message: 'Broadcast not found' })

  //octet to megabytes

  const s3 = new S3()
  const link = await s3.sendMedia({
    folder: broadcast.id,
    body: fileContent.content,
    fileName: uuidv4(),
    tag: 'roadcast=' + broadcast.id,
    ext: fileContent.extension,
  })

  const media = await prisma.media.create({
    data: {
      name: fileContent.name,
      size: fileContent.size,
      type: fileContent.type,
      source: 'local',
      url: link,
      chronicle_id: fields.chronicleId,
    },
  })

  await trigger(broadcast.reader, TriggerTypes.CHRONICLE, {
    message: fields.chronicleId,
    id: myLocalId,
  })

  return response.status(200).send({ media })
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, media_upload)

export default helper
