import Link from 'next/link'
import * as pkg from '@/package.json'
const { version } = pkg

export function RoadcastLogo() {
  return (
    <div className="text-lg font-semibold uppercase" title={version}>
      <Link href={'/'}>
        <div className="font-bold uppercase text-current no-underline">
          <span className="border-t border-current text-rc-warning-light">R</span>
          <span className="border-b border-rc-warning-light text-light-text dark:text-rc-text">oadcast</span>
        </div>
      </Link>
    </div>
  )
}
