import { CookieConsent } from '@/components'
import { HeaderNoAuth } from '@/ui'

interface BasicLayoutProps {
  children: React.ReactNode
}

export const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] gap-1 bg-light-bg text-light-text dark:bg-rc-bg dark:text-rc-text">
      <HeaderNoAuth />
      <div className="relative">
        <main className="absolute bottom-0 left-0 right-0 top-0 overflow-y-auto p-2 lg:bottom-[45px]">{children}</main>
      </div>
      <CookieConsent />
    </div>
  )
}
