import { FC, ReactNode } from 'react'
import { useFullscreenPopin } from './fullscreen-popin'

interface FullscreenPopinActionProps {
  children: ReactNode | string
}

export const FullscreenPopinAction: FC<FullscreenPopinActionProps> = ({
  children,
}) => {
  const { openModale } = useFullscreenPopin()

  return <span onClick={openModale}>{children}</span>
}
