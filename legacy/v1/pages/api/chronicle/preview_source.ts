import { NextApiRequest, NextApiResponse } from 'next'
import { JSDOM } from 'jsdom'
import { MetaHTMLAttributes } from 'react'

export default async function chronicle_preview_source(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { link } = request.body ? JSON.parse(request.body) : { link: null }

  if (!link) return response.status(400).send({ message: 'Missing parameters' })

  const isValidLink = /^(http|https):\/\//.test(link)
  if (!isValidLink)
    return response.status(400).send({ message: 'Invalid link' })

  //SCRAP --------------------
  try {
    const res = await fetch(link)
    const resText = await res.text()

    if (res.status !== 200)
      return response.status(400).send({ message: 'Error while fetching' })

    const dom = new JSDOM(resText)

    // Manipulate the DOM _______________________________________________________

    const origineLink = link.split('/').slice(0, 3).join('/')
    const cover = dom.window.document.querySelector(
      'meta[property="og:image"]'
    ) as MetaHTMLAttributes<{ value: string }> | null
    const title = dom.window.document.querySelector('title')?.textContent
    const description =
      dom.window.document.querySelector('description')?.textContent ||
      dom.window.document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content')
    const url = dom.window.document.querySelector('meta[property="og:url"]')

    const imgLink = cover?.content || url.getAttribute('content')

    return response.status(200).json({
      image: /^(http|https):\/\//.test(imgLink)
        ? imgLink
        : `${origineLink}${imgLink}`,

      title,
      description,
      link,
    })
  } catch (e) {
    return response.status(400).send({ message: 'Error while fetching' })
  }
}
