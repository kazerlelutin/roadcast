import { FC, useContext } from 'react'
import styles from './resume.module.css'
import { StringEditor } from '../string-editor/string-editor'
import { ChannelContext, ChannelRoutes } from '../../entities/channel/channel'
import { Col } from '../../ui/col/col'
import { LabelBox } from '../../ui/label-box/label-box'
import { useTranslate } from '../../hooks/translate.hook'
import {
  BroadcastContext,
  BroadcastRoutes,
} from '../../entities/broadcast/broadcast'

export const Resume: FC = () => {
  const t = useTranslate()
  const [channel, setChannel] = useContext(ChannelContext)
  const [broadcast, setBroadcast] = useContext(BroadcastContext)
  return (
    <Col>
      <LabelBox label={t('Channel')}>
        <StringEditor
          defaultValue={channel}
          link={ChannelRoutes.updateCurrent}
          name="current_channel"
          callback={setChannel}
        />
      </LabelBox>
      {broadcast.title && (
        <LabelBox label={t('title')}>
          <StringEditor
            defaultValue={broadcast.title}
            link={BroadcastRoutes.update}
            //only admin can edit the title
            id={broadcast.admin}
            name="title"
            callback={(newTitle) => {
              setBroadcast({ ...broadcast, title: newTitle })
            }}
          />
        </LabelBox>
      )}
      <p>Le filtre des editors est ici</p>
    </Col>
  )
}
