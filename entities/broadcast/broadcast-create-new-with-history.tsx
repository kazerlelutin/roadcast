import { FC } from 'react'
import {
  FullScreenPopin,
  useFullscreenPopin,
} from '../../ui/fullscreen-popin/fullscreen-popin'
import { Col } from '../../ui/col/col'
import { Button } from '../../ui/button/button'
import { useTranslate } from '../../hooks/translate.hook'
import { Flex } from '../../ui/flex/flex'
import { useBroadcast } from './broadcast'

const ModalContent: FC = () => {
  const { createBroadcastWithHistory } = useBroadcast()
  const { closeModale } = useFullscreenPopin()
  const t = useTranslate()

  return (
    <Col>
      <Col center>{t('createWithHistoryDesc')}</Col>
      <Flex alignEnd>
        <Button
          variant="normal"
          type="button"
          onClick={() => {
            createBroadcastWithHistory()
            closeModale()
          }}
        >
          {t('createWithHistory')}
        </Button>
        <Button onClick={closeModale} type="button">
          {t('cancel')}
        </Button>
      </Flex>
    </Col>
  )
}

export const BroadcastCreateNewWithHistory: FC = () => {
  const t = useTranslate({
    createWithHistory: {
      fr: 'Créer un conducteur avec historique',
      en: 'Create a new broadcast with history',
    },
  })
  return (
    <FullScreenPopin
      title={t('createWithHistory')}
      action={<Button>{t('createWithHistory')}</Button>}
    >
      <ModalContent />
    </FullScreenPopin>
  )
}
