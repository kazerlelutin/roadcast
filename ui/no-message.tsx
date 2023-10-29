interface NoMessageProps {
  message: string
}

export function NoMessage({ message }: NoMessageProps) {
  return (
    <div className="flex justify-center items-center opacity-50 h-full">
      {message}
    </div>
  )
}
