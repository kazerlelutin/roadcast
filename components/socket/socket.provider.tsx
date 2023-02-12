import { FC, ReactNode } from 'react'
import { SocketContext } from './socket.context'
import { useSocket } from './socket.hook'

interface SocketProviderProps {
  children: ReactNode
}

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const message = useSocket()

  return (
    <SocketContext.Provider value={message}>{children}</SocketContext.Provider>
  )
}
