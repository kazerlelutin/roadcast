import { useContext } from 'react'
import {
  BroadcastReadModeContext,
  BroadcastFocusContext,
} from '../../entities/broadcast/broadcast'
// import { LayoutContext } from '../../entities/layout/layout'
import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { Col } from '../../ui/col/col'
import { MiniLoaderContext } from '../mini-loader/mini-loader'
import { Flex } from '../../ui/flex/flex'

export const Actions: React.FC = () => {
  // const { layoutIsDraggable, setLayoutIsDraggable } = useContext(LayoutContext)
  const [loading] = useContext(MiniLoaderContext)
  const [readMode, setReadMode] = useContext(BroadcastReadModeContext)
  const [focusMode, setFocusMode] = useContext(BroadcastFocusContext)
  const t = useTranslate({
    lockLayout: {
      en: 'Lock layout',
      fr: 'Verrouiller le layout',
    },
    unlockLayout: {
      en: 'Unlock layout',
      fr: 'Déverrouiller le layout',
    },
    editMode: {
      en: 'Edit mode',
      fr: 'Mode édition',
    },
    readMode: {
      en: 'Read mode',
      fr: 'Mode lecture',
    },
    normalMode: {
      en: 'Normal mode',
      fr: 'Mode normal',
    },
    FocusMode: {
      en: 'Focus mode',
      fr: 'Mode focus',
    },
  })

  return (
    <Flex wrap>
      {/**  
      <Button
        onClick={() => setLayoutIsDraggable(!layoutIsDraggable)}
        variant={layoutIsDraggable ? 'red' : 'normal'}
      >
        {t(layoutIsDraggable ? 'lockLayout' : 'unlockLayout')}
      </Button> 
      */}
      <Button
        loading={loading}
        onClick={() => setReadMode(!readMode)}
        variant={readMode ? 'red' : 'normal'}
      >
        {t(readMode ? 'editMode' : 'readMode')}
      </Button>
      {readMode && (
        <Button
          loading={loading}
          onClick={() => setFocusMode(!focusMode)}
          variant={focusMode ? 'red' : 'normal'}
        >
          {t(focusMode ? 'normalMode' : 'FocusMode')}
        </Button>
      )}
    </Flex>
  )
}
