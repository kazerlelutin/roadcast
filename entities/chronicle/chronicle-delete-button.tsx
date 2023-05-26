import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { Col } from '../../ui/col/col'
import { Flex } from '../../ui/flex/flex'
import { ChronicleRoutes, useChronicles } from './chronicle'
import { usePost } from '../../hooks/post.hook'
import {
  FullScreenPopin,
  useFullscreenPopin,
} from '../../ui/fullscreen-popin/fullscreen-popin'

export const ChronicleDeleteButtonForm: React.FC = () => {
  const { chronicle } = useChronicles()
  const { closeModale } = useFullscreenPopin()
  const { deleteChronicle } = useChronicles()
  const { post } = usePost(ChronicleRoutes.delete, () => {
    deleteChronicle(chronicle.id)
    closeModale()
  })
  const t = useTranslate({
    confirmMsg: {
      en: 'Are you sure you want to delete this chronicle?',
      fr: 'Êtes-vous sûr de vouloir supprimer cette chronique?',
    },
  })

  return (
    <Col>
      <p>{t('confirmMsg')}</p>
      <Flex spaceBetween>
        <Button variant="red" onClick={() => post({ id: chronicle.id })}>
          {t('confirm')}
        </Button>
        <Button variant="normal" onClick={closeModale}>
          {t('cancel')}
        </Button>
      </Flex>
    </Col>
  )
}

export const ChronicleDeleteButton: React.FC = () => {
  const { chronicle } = useChronicles()

  const t = useTranslate({
    deleteChronicle: {
      en: 'Delete Chronicle',
      fr: 'Supprimer la chronique',
    },
  })

  return (
    <FullScreenPopin
      action={<Button variant="red">{t('deleteChronicle')}</Button>}
      title={chronicle.title}
    >
      <ChronicleDeleteButtonForm />
    </FullScreenPopin>
  )
}
