import { Children, useState } from 'react'
import styles from './tabs.module.css'

interface TabProps {
  children: React.ReactNode
  title: string
}

export function Tab({ children }: TabProps) {
  return <>{children}</>
}

export function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState<number>(0)
  return (
    <>
      <div className={styles.tabs}>
        {Children.map(children, (child, index) => (
          <div
            className={styles.tab}
            data-active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {child.props.title}
          </div>
        ))}
      </div>
      {Children.map(children, (child, index) =>
        index === activeTab ? child : <></>
      )}
    </>
  )
}
