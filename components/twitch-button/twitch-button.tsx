import styles from './twitch-button.module.css'
import { useTranslate, useCreateLink } from '@/hooks'
import { Col } from '@/ui'
import queryString from 'query-string'

export const TwitchButton: React.FC = () => {
  const t = useTranslate(),
    l = useCreateLink()

  const params = {
    redirect_uri: l('twitch'),
    client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
    response_type: 'token+id_token',
    scope:
      'channel%3Amanage%3Apolls+channel%3Aread%3Apolls+user%3Aread%3Afollows+chat%3Aread+chat%3Aedit+openid',
  }

  return (
    <Col>
      <div className={styles.connect}>{t('connectWith')}</div>
      <a
        className={styles.button}
        href={`${
          process.env.NEXT_PUBLIC_TWITCH_URL_AUTH
        }?${queryString.stringify(params, {
          encode: false,
        })}`}
      >
        <div className={styles.text}>Twitch</div>
      </a>
      <div className={styles.description}>{t('twitchButtonDescription')}</div>
    </Col>
  )
}
