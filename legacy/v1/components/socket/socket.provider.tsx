import { FC, ReactNode } from 'react'
import { useSocket } from '../socket'
import { SocketContext } from './socket.context'

interface SocketProviderProps {
  children: ReactNode
}

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const message = useSocket()

  return (
    <SocketContext.Provider value={message}>{children}</SocketContext.Provider>
  )
}
