import { CookieConsent } from '@/components'
import { HeaderNoAuth } from '@/ui'

interface BasicLayoutProps {
  children: React.ReactNode
}

export const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] gap-1 bg-light-bg dark:bg-rc-bg text-light-text dark:text-rc-text">
      <HeaderNoAuth />
      <div className="relative">
        <main className="absolute top-0 right-0 left-0 lg:bottom-[45px] bottom-0 overflow-y-auto p-2">
          {children}
        </main>
      </div>
      <CookieConsent />
    </div>
  )
}
