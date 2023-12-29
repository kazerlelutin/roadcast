import { ExternalIcon } from '@/ui'

interface ExternalLinkProps {
  href: string
  text: string
}

export function ExternalLink({ href, text }: ExternalLinkProps) {
  return (
    <span className="flex items-center gap-1">
      <a href={href} className="" target="_blank" rel="noReferrer">
        {text}
      </a>
      <ExternalIcon />
    </span>
  )
}
