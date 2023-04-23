/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, ReactNode } from 'react'

interface IntersectionObsProps {
  children: ReactNode
  threshold?: number
}

export const IntersectionObs: React.FC<IntersectionObsProps> = ({
  children,
  threshold,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [isOnScreen, setIsOnScreen] = useState(false)
  const THRESHOLD = threshold || 0.8

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsOnScreen(entry.isIntersecting)
      },
      {
        threshold: THRESHOLD,
      }
    )
  }, [])

  useEffect(() => {
    if (!ref.current || !observerRef.current) return

    observerRef.current.observe(ref.current)

    return () => {
      observerRef?.current?.disconnect()
    }
  }, [ref])

  return <div ref={ref}>{isOnScreen && children}</div>
}
