import '../styles/globals.css'
import '../styles/editor.css'
import { MiniLoaderProvider } from '../components/mini-loader/mini-loader'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import NProgress from 'nprogress'
import { Router } from 'next/router'
import { FullscreenPopinProvider } from '../ui/fullscreen-popin/fullscreen-popin.provider'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false })

export default function App({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <MiniLoaderProvider>
        <FullscreenPopinProvider>
          <div id="fullscreen-popin" />
          <Component {...pageProps} />
        </FullscreenPopinProvider>
      </MiniLoaderProvider>
    </DndProvider>
  )
}
