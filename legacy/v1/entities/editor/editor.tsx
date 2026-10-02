import { ReactNode, useState, createContext } from 'react'
import { TEntity } from '@/types'
import { Editor } from '@prisma/client'

// INTERFACES ---------------------------------------------------------------
interface EditorProviderProps {
  children: ReactNode
  editor?: IEditor
}

interface EditorsProviderProps {
  children: ReactNode
}
export interface IEditor extends Editor {}

// CONTEXT ------------------------------------------------------------------

export const EditorContext = createContext<TEntity<IEditor>>(null)
export const EditorsContext = createContext<TEntity<IEditor[]>>(null)

// PROVIDER -----------------------------------------------------------------

export function EditorProvider({ children, editor }: EditorProviderProps) {
  const value = useState<IEditor | null>(editor)

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  )
}

export function EditorsProvider({ children }: EditorsProviderProps) {
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
