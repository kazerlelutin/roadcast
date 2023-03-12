import '../styles/globals.css'
import { MiniLoaderProvider } from '../components/mini-loader/mini-loader'
import { NavigationProvider } from '../entities/navigation/navigation'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function App({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <MiniLoaderProvider>
        <NavigationProvider>
          <Component {...pageProps} />
        </NavigationProvider>
      </MiniLoaderProvider>
    </DndProvider>
  )
}
