import React, { useState } from 'react'
import { Flex } from './flex/flex'
import { EditIcon } from './icons'

interface EditModeCb {
  close: () => void
  open: () => void
}

interface EditModeProps {
  readMode: React.ReactNode // Update children prop
  children: (callbacks: EditModeCb) => React.ReactNode // Update children prop
}

export function EditMode({ children, readMode }: EditModeProps) {
  const [editMode, setEditMode] = useState(false)

  const close = () => {
    setEditMode(false)
  }

  const open = () => {
    setEditMode(false)
  }
  if (editMode) return children({ close, open })
  return (
    <Flex center>
      {readMode}
      <div onClick={() => setEditMode(true)} className="edit">
        <EditIcon />
      </div>
    </Flex>
  )
}
