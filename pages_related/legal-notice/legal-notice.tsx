import { Footer } from '@/components'
import { useTranslate } from '@/hooks'
import { Col, ExternalLink, BasicLayout } from '@/ui'
import style from './legal-notice.module.css'

export const LegalNotice: React.FC = () => {
  const t = useTranslate({
    editorTitle: {
      fr: 'Éditeur',
      en: 'Editor',
    },
    editor: {
      fr: 'Le site Roadcast est édité par Benoist Bouteiller. Vous pouvez me contacter via ',
      en: 'The Roadcast website is edited by Benoist Bouteiller. You can contact me via ',
    },
    hostingTitle: {
      fr: 'Hébergement',
      en: 'Hosting',
    },
    hosting: {
      fr: 'Roadcast est hébergé par Vercel et une partie de nos services annexes sont hébergés par Scaleway.',
      en: 'Roadcast is hosted by Vercel and some of our ancillary services are hosted by Scaleway.',
    },
  })
  return (
    <BasicLayout>
      <Col center>
        <div className={style.container}>
          <h1>{t('legalNotice')}</h1>
          <h3>{t('editorTitle')}</h3>
          <p>
            {t('editor')}
            <ExternalLink
              href="https://bouteiller.contact"
              text={t('contact')}
            />
            {'.'}
          </p>
          <h3>{t('hostingTitle')}</h3>
          <p>{t('hosting')}</p>
        </div>
      </Col>
      <Footer />
    </BasicLayout>
  )
}
