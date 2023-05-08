import ReactCookieConsent from 'react-cookie-consent'
import { useTranslate } from '../../hooks/translate.hook'

export const CookieConsent: React.FC = () => {
  const t = useTranslate({
    cookieConsent: {
      fr: "Nous utilisons des cookies pour améliorer votre expérience utilisateur et pour collecter des données anonymes sur l'utilisation de notre site Web. Nous utilisons le système d'analyse de Vercel pour collecter ces données, mais nous ne collectons aucune donnée personnelle et nous ne revendons aucune donnée. En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies. Pour en savoir plus sur l'utilisation des cookies, vous pouvez consulter notre politique en matière de cookies.",
      en: 'We use cookies to improve your user experience and to collect anonymous data about the use of our website. We use the Vercel analytics system to collect this data, but we do not collect any personal data and we do not resell any data. By continuing to browse this site, you agree to the use of cookies. To learn more about the use of cookies, you can view our cookie policy.',
    },
    IUnderstand: {
      fr: "J'ai compris",
      en: 'I understand',
    },
    IDecline: {
      fr: 'Je refuse',
      en: 'I decline',
    },
  })
  return (
    <ReactCookieConsent
      enableDeclineButton
      flipButtons
      location="bottom"
      buttonText={t('IUnderstand')}
      cookieName="roadcast-cookie-consent"
      style={{
        background: 'var(--dms-bg)',
        color: 'var(--dms-info-dark)',
        borderTop: '1px solid var(--dms-light)',
      }}
      buttonStyle={{
        color: 'var(--dms-text-invert)',
        background: 'var(--dms-highlight-dark)',
        fontSize: '15px',
      }}
      declineButtonStyle={{
        margin: '10px 10px 10px 0',
        background: 'var(--dms-warning)',
        color: 'var(--dms-text-invert)',
      }}
      declineButtonText={t('IDecline')}
      expires={450}
    >
      {t('cookieConsent')}
    </ReactCookieConsent>
  )
}
