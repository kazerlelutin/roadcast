import { useTranslate } from '../../hooks/translate.hook'
import { BasicLayout } from '../../layouts/basic/basic.layout'
import style from './index.module.css'
import { BroadcastCreateForm } from '../../entities/broadcast/broadcast-create-form'
import { BroadcastList } from '../../entities/broadcast/broadcast-list'
import { Gridbox } from '../../ui/grid-box/grid-box'

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
      </div>
    </BasicLayout>
  )
}
