import { useTranslate } from '@/hooks'
import { BasicLayout } from '@/layouts'
import style from './index.module.css'
import { BroadcastCreateForm } from '@/entities'
import { Gridbox } from '@/ui'
import { Footer } from '@/components'
import { Tab, Tabs } from '@/ui/tabs/tabs'
import { ScheduleAccountCreateForm } from '@/entities/schedule/schedule-account-create-form'
import { HomeItemList } from '@/components/home-items-list/home-items-list'

export function IndexPage() {
  const t = useTranslate()
  return (
    <BasicLayout>
      <div className={style.container}>
        <div className={style.actions}>
          <div />
          <div className={style.form}>
            <Tabs>
              <Tab title={t('drivers')}>
                <BroadcastCreateForm />
                <Gridbox>
                  <HomeItemList type="broadcast" />
                </Gridbox>
              </Tab>
              <Tab title={t('schedule')}>
                <ScheduleAccountCreateForm />
                <Gridbox>
                  <HomeItemList type="schedule" />
                </Gridbox>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className={style.read}>
          <h2>{t('titleHome')}</h2>
          <p>{t('appSummary')}</p>
          <h3 className={style.subtitle}>{t('subtitleHome')}</h3>
          <p>{t('appSummarySchedule')}</p>
          <p className={style.account}>{t('noAccountRequired')}</p>
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    </BasicLayout>
  )
}
