import { useTranslate } from '@/hooks'
import { BasicLayout } from '@/layouts'
import style from './index.module.css'
import { BroadcastCreateForm, BroadcastList } from '@/entities'
import { Gridbox } from '@/ui'
import { Footer } from '@/components'

export default function Index() {
  const t = useTranslate()
  return (
    <BasicLayout>
      <div className={style.container}>
        <div className={style.actions}>
          <div className={style.form}>
            <BroadcastCreateForm />
          </div>
          <Gridbox>
            <BroadcastList />
          </Gridbox>
        </div>
        <div className={style.read}>
          <h2>{t('titleAccueil')}</h2>
          <p>{t('appSummary')}</p>
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    </BasicLayout>
  )
}
