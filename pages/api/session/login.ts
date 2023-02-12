import { NextApiRequest, NextApiResponse } from 'next'
import { JWT_TOKEN, TWITCH_CLIENT_ID } from '../../../utils/constants'
import { Profiles } from '../../../entities/session/session'
import { defaultLayout } from '../../../data/default-layout'
import jwt from 'jsonwebtoken'
import { prisma } from '../../../db/db'

export default async function session_login(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (!request.body) return response.status(400).json({ error: 'no body' })
  const { token } = JSON.parse(request.body)
  try {
    const res = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        Accept: 'application/vnd.twitchtv.v5+json',
        Authorization: 'Bearer ' + token,
      },
    })

    const { data } = await res.json()
    if (data[0].id === 'undefined')
      return response.status(400).json({ error: 'no data' })

    const dataSession = data[0]
    const user = await prisma.user.findUnique({
      where: {
        twitch_id: dataSession.id,
      },
      include: {
        layouts: {
          where: {
            current: true,
          },
        },
      },
    })

    if (user) {
      const token_api = jwt.sign({ id: user.id }, JWT_TOKEN)
      return response.status(200).json({ ...user, ...dataSession, token_api })
    }

    const defaultLayoutString = JSON.stringify(defaultLayout)
    const newUser = await prisma.user.create({
      data: {
        twitch_id: dataSession.id,
        login: dataSession.login,
        profile: Profiles.free,
        channel: dataSession.login,
        current_channel: dataSession.login,
        token_profile: token,
        layouts: {
          create: {
            name: 'default',
            current: true,
            layout: JSON.parse(defaultLayoutString),
          },
        },
      },
      include: {
        layouts: {
          where: {
            current: true,
          },
        },
      },
    })

    const token_api = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET)

    return response.status(200).json({ ...newUser, ...dataSession, token_api })
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
}
