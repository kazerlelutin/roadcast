import { useContext } from 'react'
import { useModes } from '../../entities/broadcast/broadcast'
import { useTranslate } from '../../hooks/translate.hook'
import { Button } from '../../ui/button/button'
import { MiniLoaderContext } from '../mini-loader/mini-loader'
import { Flex } from '../../ui/flex/flex'
import useIsMobile from '../../hooks/is-mobile'

export const Actions: React.FC = () => {
  const t = useTranslate()
  const isMobile = useIsMobile()
  const [loading] = useContext(MiniLoaderContext)
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
