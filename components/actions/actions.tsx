import { useContext } from 'react'
import {
  BroadcastReadModeContext,
  BroadcastFocusContext,
} from '../../entities/broadcast/broadcast'
import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { MiniLoaderContext } from '../mini-loader/mini-loader'
import { Flex } from '../../ui/flex/flex'
import useIsMobile from '../../hooks/is-mobile'

export const Actions: React.FC = () => {
  const isMobile = useIsMobile()
  const [loading] = useContext(MiniLoaderContext)
  const [readMode, setReadMode] = useContext(BroadcastReadModeContext)
  const [focusMode, setFocusMode] = useContext(BroadcastFocusContext)
  const t = useTranslate({
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
    <Flex>
      <Button
        loading={loading}
        onClick={() => setReadMode(!readMode)}
        variant={readMode ? 'red' : 'normal'}
      >
        {t(readMode ? 'editMode' : 'readMode')}
      </Button>
      {readMode && !isMobile && (
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
