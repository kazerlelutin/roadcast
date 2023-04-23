import { NextApiRequest, NextApiResponse } from 'next'
import { JSDOM } from 'jsdom'
import { broadcastMiddleWare } from '../../../middlewares/broadcast.middleware'
import { BroadcastCtx } from '../../../types/broadcast-ctx'
import { MetaHTMLAttributes } from 'react'
import queryString from 'query-string'
import { trigger } from '../../../services/trigger'
import { TriggerTypes } from '../../../components/socket'

async function media_scrap(
  request: NextApiRequest,
  response: NextApiResponse,
  infos: BroadcastCtx
) {
  const { editor, myLocalId } = infos
  const { chronicleId, link } = request.body
    ? JSON.parse(request.body)
    : { link: null, chronicleId: null }

  const broadcast = await prisma.broadcast.findFirst({
    where: {
      editor,
    },
  })

  if (!chronicleId || !link)
    return response.status(400).send({ message: 'Missing parameters' })

  const isValidLink = /^(http|https):\/\//.test(link)
  if (!isValidLink)
    return response.status(400).send({ message: 'Invalid link' })

  const medias: unknown[] = []

  //SCRAP --------------------
  try {
    const res = await fetch(link)
    const resText = await res.text()

    if (res.status !== 200)
      return response.status(400).send({ message: 'Error while fetching' })

    const dom = new JSDOM(resText)
    const isYouTubeLinkRgx =
      /https:\/\/www\.(youtube\.com|youtu\.be)\/watch\?v=([a-zA-Z0-9_-]+)/

    const isYouTubeLink = isYouTubeLinkRgx.test(link)
    // Manipulate the DOM _______________________________________________________

    const cover = dom.window.document.querySelector(
      'meta[property="og:image"]'
    ) as MetaHTMLAttributes<{ value: string }> | null
    const title = dom.window.document.querySelector('title')?.textContent

    const imgs = Array.from(dom.window.document.querySelectorAll('img'))
    const embeds = Array.from(dom.window.document.querySelectorAll('iframe'))

    // treat link image  ______________________________________________________
    if (res.headers.get('content-type').match(/image/g)) {
      const name = link.split('/').at(-1)
      const media = await prisma.media.create({
        data: {
          name,
          size: 0,
          type: 'image',
          source: link,
          url: link,
          chronicle_id: chronicleId,
        },
      })

      medias.push(media)
    }
    // treat Youtube videos ______________________________________________________
    if (isYouTubeLink) {
      const shortLinkRgx = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/
      const isShortLink = shortLinkRgx.test(link)
      const parsedLink = queryString.parseUrl(link)
      const videoId = (parsedLink?.query?.v as string) || ''
      const time = (parsedLink?.query?.t as string) || '0'

      //IF Youtube Video, it's a single media
      const media = await prisma.media.create({
        data: {
          name: title || 'YouTube video',
          size: 0,
          type: 'video',
          source: link,
          cover: cover?.content || '',
          url: `https://youtube.com/watch?v=${
            isShortLink ? link.split('/').at(-1) : videoId
          }&t=${time}`,
          chronicle_id: chronicleId,
        },
      })

      medias.push(media)
    }

    trigger(broadcast.reader, {
      message: chronicleId,
      id: myLocalId,
      type: TriggerTypes.CHRONICLE,
    })

    trigger(broadcast.editor, {
      message: 'refresh',
      id: myLocalId,
      type: TriggerTypes.CHRONICLE,
    })
  } catch (e) {
    return response.status(400).send({ message: 'Error while fetching' })
  }

  return response.status(200).send(medias)
}

const helper = (request: NextApiRequest, response: NextApiResponse) =>
  broadcastMiddleWare(request, response, media_scrap)

export default helper
