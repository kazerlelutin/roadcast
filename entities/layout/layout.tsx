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

export interface LayoutContextProps {
  layout: ILayout
  setLayout: (layout: ILayout) => void
  layoutIsDraggable: boolean
  setLayoutIsDraggable: (disabledDrag: boolean) => void
}

export const layoutInitialValue: ILayout = {
  id: '',
  user_id: '',
  name: '',
  layout: defaultLayout,
}

// CONTEXT ------------------------------------------------------------------
export const LayoutContext = createContext<LayoutContextProps>({
  layout: layoutInitialValue,
  setLayout: () => {},
  layoutIsDraggable: false,
  setLayoutIsDraggable: () => {},
})

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
  const [layout, setLayout] = useState<ILayout>(layoutInitialValue)
  const [layoutIsDraggable, setLayoutIsDraggable] = useState(false)

  //TODO, créer un hook pour charger le layout soit de la session, soit du localStorage, soit du defaultLayout

  useEffect(() => {
    if (
      session &&
      session.layouts &&
      session.layouts.length > 0 &&
      !layout?.id
    ) {
      //setLayout(session.layouts[0])
      setLayout(session.layouts[0])
    }
  }, [session])

  return (
    <LayoutContext.Provider
      value={{ layout, setLayout, layoutIsDraggable, setLayoutIsDraggable }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
