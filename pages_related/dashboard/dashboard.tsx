import { SessionProvider } from '../../entities/session/session'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { HeaderNoAuth } from '../../ui/header-no-auth/header-no-auth'
import styles from './dashboard.module.css'
import { LayoutProvider } from '../../entities/layout/layout'
import { LayoutGrid } from '../../entities/layout/layout-grid'
import { ChannelProvider } from '../../entities/channel/channel'
import { ChatProvider } from '../../entities/chat/chat'
import { NavigationProvider } from '../../entities/navigation/navigation'
import { BroadcastProvider } from '../../entities/broadcast/broadcast'
import { ChroniclesProvider } from '../../entities/chronicle/chronicle'
import { SocketProvider } from '../../components/socket'

export const DashboardComp: React.FC = () => {
  return (
    <div className={styles.container}>
      <HeaderNoAuth />
      <div className={styles.content}>
        <LayoutGrid />
      </div>
    </div>
  )
}

export const Dashboard: React.FC = () => {
  return (
    <SessionProvider>
      <SocketProvider>
        <LayoutProvider>
          <ChannelProvider>
            <ChatProvider>
              <NavigationProvider>
                <BroadcastProvider>
                  <ChroniclesProvider>
                    <DashboardComp />
                  </ChroniclesProvider>
                </BroadcastProvider>
              </NavigationProvider>
            </ChatProvider>
          </ChannelProvider>
        </LayoutProvider>
      </SocketProvider>
    </SessionProvider>
  )
}
