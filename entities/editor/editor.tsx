import { ReactNode, useState } from 'react'
import { createContext } from 'react'
import { TEntity } from '../../types/entity.type'

// INTERFACES ---------------------------------------------------------------
interface EditorProviderProps {
  children: ReactNode
}

export interface IEditor {
  id: string
  name: string
  description: string
  broadcast_id: string
  createdAt: Date
}

// CONTEXT ------------------------------------------------------------------

export const EditorContext = createContext<TEntity<IEditor>>(null)

// PROVIDER -----------------------------------------------------------------

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const value = useState<IEditor>({
    id: '',
    name: '',
    description: '',
    broadcast_id: '',
    createdAt: new Date(),
  })

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  )
}

// ROUTES -------------------------------------------------------------------

export enum EditorRoutes {
  delete = 'editor/delete',
  findOne = 'editor/one',
  findMany = 'editor/all',
  create = 'editor/create',
  update = 'editor/update',
}
