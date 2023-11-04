import { useModes } from '@/entities'
import { useTranslate, useIsMobile } from '@/hooks'
import { Button, Flex } from '@/ui'
import { useMiniLoader } from '@/components'
import { useBroadcast } from '@/stores'

export function Actions() {
  const t = useTranslate()
  const isMobile = useIsMobile()
  const [loading] = useMiniLoader()
  const { broadcast, focusMode, readMode, toggleFocus, toggleReadMode } =
    useBroadcast()

  return (
    <div className="flex gap-2">
      {broadcast.editor && (
        <Button
          loading={loading}
          onClick={toggleReadMode}
          variant={readMode ? 'red' : 'normal'}
        >
          {t(readMode ? 'editMode' : 'readMode')}
        </Button>
      )}
      {readMode && !isMobile && (
        <Button
          loading={loading}
          onClick={toggleFocus}
          variant={focusMode ? 'red' : 'normal'}
        >
          {t(focusMode ? 'normalMode' : 'FocusMode')}
        </Button>
      )}
    </div>
  )
}
