import styles from './mini-loader.module.css'
import { ReactNode, useState, createContext, useContext } from 'react'

// INTERFACES ---------------------------------------------------------------
interface MiniLoaderProps {
  children: ReactNode
}

// CONTEXT ------------------------------------------------------------------
export const MiniLoaderInitialValue = [false, (_value: boolean) => {}]
export const MiniLoaderContext =
  createContext<[boolean, (value: boolean) => void]>(null)

// PROVIDER -----------------------------------------------------------------
export const MiniLoaderProvider: React.FC<MiniLoaderProps> = ({ children }) => {
  const ctx = useState<boolean>(false)

  return (
    <MiniLoaderContext.Provider value={ctx}>
      {ctx[0] && <MiniLoader />}
      {children}
    </MiniLoaderContext.Provider>
  )
}

// VIEW
export const MiniLoader = () => (
  <div className={styles.container}>
    <div className={styles['lds-ring']}>
      {Array.from(Array(3).keys()).map((num) => (
        <div key={num} />
      ))}
    </div>
  </div>
)

// HOOKS --------------------------------------------------------------------
export const useMiniLoader = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [_, setGlobalLoading] = useContext(MiniLoaderContext)

  const startLoading = () => {
    setLoading(true)
    setGlobalLoading(true)
  }

  const stopLoading = () => {
    setLoading(false)
    setGlobalLoading(false)
  }

  return [loading, startLoading, stopLoading] as const
}
