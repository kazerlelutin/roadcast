import { FC } from 'react'
import { FullScreenPopin, useFullscreenPopin, Col, Button, Flex } from '@/ui'
import { useTranslate } from '@/hooks'
import { useBroadcast } from '@/entities'

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
