import '../styles/globals.css'
import { MiniLoaderProvider } from '../components/mini-loader/mini-loader'
import { SocketProvider } from '../components/socket'
import { NavigationProvider } from '../entities/navigation/navigation'

export default function App({ Component, pageProps }) {
  return (
    <MiniLoaderProvider>
      <SocketProvider>
        <NavigationProvider>
          <Component {...pageProps} />
        </NavigationProvider>
      </SocketProvider>
    </MiniLoaderProvider>
  )
}
