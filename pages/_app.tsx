import '../styles/globals.css'
import '../styles/editor.css'
import { MiniLoaderProvider } from '../components/mini-loader/mini-loader'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import NProgress from 'nprogress'
import { Router } from 'next/router'
import { FullscreenPopinProvider } from '../ui/fullscreen-popin/fullscreen-popin.provider'
import { useTranslate } from '../hooks/translate.hook'
import Head from 'next/head'
import { useRouter } from 'next/router'

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const baseUrl = 'https://roadcast.app/'
  const t = useTranslate({
    title: {
      fr: '📡 ROADCAST',
      en: '📡 ROADCAST',
    },
  })
  return (
    <DndProvider backend={HTML5Backend}>
      <MiniLoaderProvider>
        <FullscreenPopinProvider>
          <Head>
            <title>{t('title')}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content={t('appSummary')} />
            <meta property="og:title" content={t('title')} />
            <meta property="og:type" content="siteweb" />
            <meta property="og:image" content={`${baseUrl}preview.webp`} />
            <meta name="twitter:card" content="photo" />
            <meta name="twitter:site" content={baseUrl} />
            <meta name="twitter:title" content={t('title')} />
            <meta name="twitter:description" content={t('appSummary')} />
            <meta name="twitter:image" content={`${baseUrl}preview.jpg`} />
            <meta
              name="twitter:url"
              content={`${baseUrl}${router.asPath.substring(1)}`}
            />
          </Head>
          <div id="fullscreen-popin" />
          <Component {...pageProps} />
        </FullscreenPopinProvider>
      </MiniLoaderProvider>
    </DndProvider>
  )
}
