import { useBroadcast, useModes } from '@/entities'
import { useTranslate, useIsMobile } from '@/hooks'
import { Button, Flex } from '@/ui'
import { useMiniLoader } from '@/components'

export function Actions() {
  const t = useTranslate()
  const isMobile = useIsMobile()
  const [loading] = useMiniLoader()
  const { broadcast } = useBroadcast()
  const { isFocused, isReadMode, switchFocus, switchReadMode } = useModes()

  return (
    <Flex>
      {broadcast.editor && (
        <Button
          loading={loading}
          onClick={switchReadMode}
          variant={isReadMode ? 'red' : 'normal'}
        >
          {t(isReadMode ? 'editMode' : 'readMode')}
        </Button>
      )}
      {isReadMode && !isMobile && (
        <Button
          loading={loading}
          onClick={switchFocus}
          variant={isFocused ? 'red' : 'normal'}
        >
          {t(isFocused ? 'normalMode' : 'FocusMode')}
        </Button>
      )}
    </Flex>
  )
}
