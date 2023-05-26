/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useEffect, useState } from 'react'
import { useChronicles } from './chronicle'
import { useDebounce } from '../../hooks/debounce.hook'

interface ChronicleWrapperProps {
  children: ReactNode
}

export const ChronicleWrapper: React.FC<ChronicleWrapperProps> = ({
  children,
}) => {
  const { chronicle, currentChronicle, setCurrentChronicle } = useChronicles()
  const [overChronicle, setOverChronicle] = useState<string>('')
  const overChronicleDebounced = useDebounce(overChronicle, 500)

  // if i hover a chronicle, i want to set it as the current chronicle, but not if i hover fast
  useEffect(() => {
    if (currentChronicle === chronicle.id && overChronicle === '') return
    setCurrentChronicle(chronicle.id)
  }, [overChronicleDebounced])

  return (
    <div
      onMouseEnter={() => setOverChronicle(chronicle.id)}
      onMouseLeave={() => setOverChronicle('')}
      onFocus={() => setOverChronicle(chronicle.id)}
    >
      {children}
    </div>
  )
}
