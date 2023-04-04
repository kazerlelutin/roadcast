import Image from 'next/image'
import { useTranslate } from '../../hooks/translate.hook'
import styles from './kofi-button.module.css'

export default function KofiButton() {
  const t = useTranslate({
    BuyCoffe: {
      en: 'Buy me a coffee',
      fr: 'Payez-moi un café',
    },
  })
  return (
    <a
      className={styles.coffe}
      href="https://ko-fi.com/kazerlelutin"
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.buy}>{t('BuyCoffe')}</div>

      <div className={styles.img}>
        <Image src="/kofi_logo.svg" width={30} height={20} alt="kofi logo" />
      </div>
    </a>
  )
}
