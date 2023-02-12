import { FC, useContext } from 'react'
import styles from './resume.module.css'
import { StringEditor } from '../string-editor/string-editor'
import { ChannelContext, ChannelRoutes } from '../../entities/channel/channel'
import { Col } from '../../ui/col/col'
import { Label } from '../../ui/label/label'
import { LabelBox } from '../../ui/label-box/label-box'
import { useTranslate } from '../../hooks/translate.hook'

export const Resume: FC = () => {
  const t = useTranslate()
  const [channel, setChannel] = useContext(ChannelContext)
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
    </Col>
  )
}
