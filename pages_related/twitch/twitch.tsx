import { useTranslate } from '../../hooks/translate.hook'
import { Col } from '../../ui/col/col'
import queryString from 'query-string'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from '../../utils/set-cookie'

export const Twitch: React.FC = () => {
  const router = useRouter(),
    t = useTranslate({
      waitConnexion: {
        fr: 'Connexion en cours...',
        en: 'Connection in progress...',
      },
    })

  useEffect(() => {
    const tokens: null | { access_token?: string } = queryString.parse(
      document.location.hash.replace('#', '')
    )

    if (tokens && tokens?.access_token) {
      setCookie(tokens.access_token)
      document.location.hash = ''
      router.push('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Col>
      <h2>{t('waitConnexion')}</h2>
    </Col>
  )
}
