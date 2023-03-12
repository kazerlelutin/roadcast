import { useContext } from 'react'
import { LayoutContext } from '../../entities/layout/layout'
import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { Col } from '../../ui/col/col'

export const Actions: React.FC = () => {
  const { layoutIsDraggable, setLayoutIsDraggable } = useContext(LayoutContext)
  const t = useTranslate({
    lockLayout: {
      en: 'Lock layout',
      fr: 'Verrouiller le layout',
    },
    unlockLayout: {
      en: 'Unlock layout',
      fr: 'Déverrouiller le layout',
    },
  })

  return (
    <Col>
      <Button
        onClick={() => setLayoutIsDraggable(!layoutIsDraggable)}
        variant={layoutIsDraggable ? 'red' : 'normal'}
      >
        {t(layoutIsDraggable ? 'lockLayout' : 'unlockLayout')}
      </Button>
    </Col>
  )
}
