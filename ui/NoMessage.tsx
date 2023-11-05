interface NoMessageProps {
  message: string
}

export function NoMessage({ message }: NoMessageProps) {
  return <div className="flex h-full items-center justify-center opacity-50">{message}</div>
}
