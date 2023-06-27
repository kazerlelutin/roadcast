import Link from 'next/link'
import { useTranslate } from '@/hooks'
import { ExternalLink, Flex } from '@/ui'

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
