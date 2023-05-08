import Link from 'next/link'
import { useTranslate } from '../../hooks/translate.hook'
import { Flex } from '../../ui/flex/flex'
import { ExternalLink } from '../../ui/external-link/external-link'

export const Footer: React.FC = () => {
  const t = useTranslate({
    home: {
      fr: 'Accueil',
      en: 'Home',
    },
  })
  return (
    <Flex center>
      <Link href="/">{t('home')}</Link>
      <Link href="/about">{t('about')}</Link>
      <Link href="/legal-notice">{t('legalNotice')}</Link>
      <ExternalLink href="https://bouteiller.contact" text={t('contact')} />
    </Flex>
  )
}
