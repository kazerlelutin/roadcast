import { ReactNode, useState, createContext } from 'react'
import { TEntity } from '@/types'

// INTERFACES ---------------------------------------------------------------
interface EditorProviderProps {
  children: ReactNode
  editor?: IEditor
}

interface EditorsProviderProps {
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
export const EditorsContext = createContext<TEntity<IEditor[]>>(null)

// PROVIDER -----------------------------------------------------------------

export const EditorProvider: React.FC<EditorProviderProps> = ({
  children,
  editor,
}) => {
  const value = useState<IEditor | null>(editor)

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  )
}

export const EditorsProvider: React.FC<EditorsProviderProps> = ({
  children,
}) => {
  const value = useState<IEditor[]>([])

  return (
    <EditorsContext.Provider value={value}>{children}</EditorsContext.Provider>
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
