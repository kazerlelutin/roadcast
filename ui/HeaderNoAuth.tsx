import dynamic from 'next/dynamic'

import { RoadcastLogo, KofiButton } from '@/ui'

//for prevent SSR render with localStorage
const ThemeSwitcher = dynamic(
  () => import('../components/theme-switcher/theme-switcher').then((mod) => mod.ThemeSwitcher),
  {
    ssr: false,
  }
)

export function HeaderNoAuth() {
  return (
    <div className="p-1">
      <header className="flex items-center justify-between">
        <RoadcastLogo />
        <div className="flex gap-1">
          <KofiButton />
          <ThemeSwitcher />
        </div>
      </header>
    </div>
  )
}
