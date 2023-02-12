/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react'
import { TEntity } from '../../types/entity.type'
import { SessionContext } from '../session/session'
import { defaultLayout } from '../../data/default-layout'

// INTERFACES ---------------------------------------------------------------
interface LayoutProviderProps {
  children: ReactNode
}

export enum LayoutCaseNames {
  resume = 'resume',
  medias = 'medias',
  driver = 'driver',
  actions = 'actions',
  preview = 'preview',
  chat = 'chat',
  chatForm = 'chatForm',
  three = 'three',
}
export interface ILayoutGrid {
  i: string
  x: number
  y: number
  w: number
  h: number
  static?: boolean
}
export interface ILayout {
  id: string
  user_id: string
  name: string
  layout: ILayoutGrid[]
}

export const layoutInitialValue: ILayout = {
  id: '',
  user_id: '',
  name: '',
  layout: defaultLayout,
}

// CONTEXT ------------------------------------------------------------------
export const LayoutContext = createContext<TEntity<ILayout>>([
  layoutInitialValue,
  () => {},
])

// ROUTES -------------------------------------------------------------------

export enum LayoutRoutes {
  delete = 'layout/delete',
  findOne = 'layout/current',
  findMany = 'layout/all',
  create = 'layout/create',
  update = 'layout/update',
}

// PROVIDER -----------------------------------------------------------------

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const session = useContext(SessionContext)
  const value = useState<ILayout>(layoutInitialValue)

  //TODO, créer un hook pour charger le layout soit de la session, soit du localStorage, soit du defaultLayout

  useEffect(() => {
    if (
      session &&
      session.layouts &&
      session.layouts.length > 0 &&
      !value[0]?.id
    ) {
      //setLayout(session.layouts[0])
      value[1](session.layouts[0])
    }
  }, [session])

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}
