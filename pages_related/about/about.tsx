import { Footer } from '../../components/footer/footer'
import { useTranslate } from '../../hooks/translate.hook'
import { BasicLayout } from '../../layouts/basic/basic.layout'
import { Col } from '../../ui/col/col'
import styles from './about.module.css'
import pkg from '../../package.json'
import { ExternalLink } from '../../ui/external-link/external-link'

export const About: React.FC = () => {
  const t = useTranslate({
    par1: {
      fr: "Roadcast est une application que j'ai créée pour aider les utilisateurs à gérer et à partager facilement des conducteurs pour leurs émissions en direct. L'application est conçue pour être intuitive et facile à utiliser, même pour les utilisateurs novices.",
      en: 'Roadcast is an application that I created to help users easily manage and share drivers for their live streams. The app is designed to be intuitive and easy to use, even for novice users.',
    },

    part2: {
      fr: "L'une des caractéristiques clés de Roadcast est sa gratuité totale d'utilisation, sans aucun compte utilisateur requis. Roadcast est accessible à tous.",
      en: 'One of the key features of Roadcast is its completely free to use, with no user account required. Roadcast is accessible to everyone.',
    },
    part3_1: {
      fr: "Le code source de l'application est open source et est disponible sur ",
      en: 'The source code for the app is open source and is available on ',
    },
    part3: {
      fr: "Si vous êtes intéressé par le développement d'applications, je vous encourage à explorer le code et à contribuer à son amélioration en partageant vos commentaires et suggestions.",
      en: 'If you are interested in app development, I encourage you to explore the code and contribute to its improvement by sharing your feedback and suggestions.',
    },
    part4: {
      fr: "Enfin, si vous trouvez l'application Roadcast utile et que vous souhaitez me soutenir dans le développement continu de l'application, vous pouvez faire un don sur ma page Ko-Fi. Votre soutien m'aidera à continuer à fournir des mises à jour et des améliorations pour Roadcast.",
      en: 'Finally, if you find the Roadcast app useful and would like to support me in the continued development of the app, you can make a donation on my Ko-Fi page. Your support will help me continue to provide updates and improvements for Roadcast.',
    },
    part5: {
      fr: "Merci d'avoir choisi Roadcast pour vos besoins de diffusion en direct. J'espère que vous trouverez l'application utile et je suis impatient de voir les émissions que vous créerez avec elle.",
      en: 'Thank you for choosing Roadcast for your live streaming needs. I hope you find the app useful and I look forward to seeing the shows you create with it.',
    },
  })

  return (
    <BasicLayout>
      <Col center>
        <div className={styles.container}>
          <h1>{t('about')}</h1>
          <p>{t('par1')}</p>
          <p>{t('part2')}</p>
          <p>
            {t('part3_1')}
            <ExternalLink href={pkg.repository.url} text={t('Github')} />
            {'. '}
            {t('part3')}
          </p>
          <p>{t('part4')}</p>
          <p>{t('part5')}</p>
        </div>
        <Footer />
      </Col>
    </BasicLayout>
  )
}
