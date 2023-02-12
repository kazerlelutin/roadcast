import { ReactNode, useState, useContext } from 'react'
import { createContext } from 'react'
import { TEntity } from '../../types/entity.type'

// INTERFACES ---------------------------------------------------------------
interface ModelProviderProps {
  children: ReactNode
}

export interface IModel {
  name: string
  description: string
}

// CONTEXT ------------------------------------------------------------------

export const ModelContext = createContext<TEntity<IModel>>(null)

// PROVIDER -----------------------------------------------------------------

export const SessionProvider: React.FC<ModelProviderProps> = ({ children }) => {
  const value = useState<IModel>({
    name: '',
    description: '',
  })

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
}

// ROUTES -------------------------------------------------------------------

export enum ModelRoutes {
  delete = 'model/delete',
  findOne = 'model/one',
  findMany = 'model/all',
  create = 'model/create',
  uodate = 'model/update',
}

// HOOK --------------------------------------------------------------------

export const useModel = () => {
  const [model, setModel] = useContext(ModelContext)

  //TODO faire une fonction de fetch qui n'appel pas le hook ?
  //ici on peut ajouter des méthodes pour modifier le model
  return { model, setModel }
}
