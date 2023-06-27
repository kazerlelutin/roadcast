import { useModes } from '@/entities'
import { useTranslate, useIsMobile } from '@/hooks'
import { Button, Flex } from '@/ui'
import { useMiniLoader } from '@/components'

export const Actions: React.FC = () => {
  const t = useTranslate()
  const isMobile = useIsMobile()
  const [loading] = useMiniLoader()
  const { isFocused, isReadMode, switchFocus, switchReadMode } = useModes()

  return (
    <Flex>
      <Button
        loading={loading}
        onClick={switchReadMode}
        variant={isReadMode ? 'red' : 'normal'}
      >
        {t(isReadMode ? 'editMode' : 'readMode')}
      </Button>
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
