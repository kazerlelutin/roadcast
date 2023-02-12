import { useRouter } from 'next/router'
import { createContext, useState, useEffect } from 'react'
import { TEntity } from '../../types/entity.type'

// INTERFACES ---------------------------------------------------------------
export enum NavigationPages {
  home = 'home',
  broadcast = 'broadcast',
}

interface NavigationProviderProps {
  children: React.ReactNode
}

// HOOKS --------------------------------------------------------------------

export const useNavigation = () => {
  const router = useRouter()
  const [_page, setPage] = useState<NavigationPages>(NavigationPages.home)

  useEffect(() => {
    setPage(router?.query?.page as NavigationPages)
  }, [router?.query?.page])
}

// COMPONENT -------------------------------------------------------------------

export const NavigationMain: React.FC = () => {
  const router = useRouter()
  const page = router?.query?.page as NavigationPages

  if (page === NavigationPages.home) return <p>TEST</p>
  if (page === NavigationPages.broadcast) return <p>broadcast</p>
  return <p>404</p>
}

// CONTEXT ------------------------------------------------------------------
export const NavivationContext = createContext<TEntity<NavigationPages>>([
  NavigationPages.home,
  () => {},
])

// PROVIDER -----------------------------------------------------------------
export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const value = useState<NavigationPages>(NavigationPages.home)

  return (
    <NavivationContext.Provider value={value}>
      {children}
    </NavivationContext.Provider>
  )
}
