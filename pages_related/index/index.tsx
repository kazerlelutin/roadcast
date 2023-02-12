import dynamic from 'next/dynamic'
import { useTranslate } from '../../hooks/translate.hook'
import { BasicLayout } from '../../layouts/basic/basic.layout'
import style from './index.module.css'

//for prevent SSR render with localStorage
const TwitchButton = dynamic(
  () =>
    import('../../components/twitch-button/twitch-button').then(
      (mod) => mod.TwitchButton
    ),
  {
    ssr: false,
  }
)

export default function Index() {
  const t = useTranslate()
  return (
    <BasicLayout>
      <div className={style.container}>
        <div className={style.actions}>
          <TwitchButton />
        </div>
        <div className={style.read}>
          <h2>{t('titleAccueil')}</h2>
          <p>{t('appSummary')}</p>
        </div>
      </div>
    </BasicLayout>
  )
}
