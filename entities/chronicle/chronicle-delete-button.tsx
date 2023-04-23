import { useContext } from 'react'
import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { Col } from '../../ui/col/col'
import { Flex } from '../../ui/flex/flex'
import {
  ChronicleContext,
  ChronicleRoutes,
  ChroniclesContext,
} from './chronicle'
import { usePost } from '../../hooks/post.hook'
import { FullscreenPopinContext } from '../../ui/fullscreen-popin/fullscreen-popin.context'
import { FullScreenPopin } from '../../ui/fullscreen-popin/fullscreen-popin'

export const ChronicleDeleteButtonForm: React.FC = () => {
  const [chronicle] = useContext(ChronicleContext)
  const [_, setOpen] = useContext(FullscreenPopinContext)
  const [chronicles, setChronicles] = useContext(ChroniclesContext)
  const { post } = usePost(ChronicleRoutes.delete, () => {
    setChronicles(chronicles.filter((c) => c.id !== chronicle.id))
    setOpen(false)
  })
  const t = useTranslate({
    confirm: {
      en: 'Confirm',
      fr: 'Confirmer',
    },
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
        <Button
          variant="normal"
          onClick={() => {
            setOpen(false)
          }}
        >
          {t('cancel')}
        </Button>
      </Flex>
    </Col>
  )
}

export const ChronicleDeleteButton: React.FC = () => {
  const [chronicle] = useContext(ChronicleContext)
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
