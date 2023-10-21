import Link from 'next/link'
import { FC } from 'react'
import * as pkg from '@/package.json'
const { version } = pkg

export const RoadcastLogo: FC = () => (
  <div className="font-semibold text-lg uppercase" title={version}>
    <Link href={'/'}>
      <div className="text-current no-underline uppercase font-bold">
        <span className="border-t border-current text-rc-warning-light">R</span>
        <span className="border-b border-rc-warning-light dark:text-rc-text text-light-text">
          oadcast
        </span>
      </div>
    </Link>
  </div>
)