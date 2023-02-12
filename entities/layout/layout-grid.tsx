import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import styles from './layout-styles/layout-grid.module.css'
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout'
import { LayoutCaseNames, LayoutContext } from '../../entities/layout/layout'
import { useContext } from 'react'
import { LayoutSwitcher } from '../../entities/layout/layout-switcher'
import { usePost } from '../../hooks/post.hook'
import { LayoutRoutes } from './layout'
import { Gridbox } from '../../ui/grid-box/grid-box'

export const LayoutGrid: React.FC = () => {
  const { post } = usePost(LayoutRoutes.update)
  const [userLayout] = useContext(LayoutContext)
  const { layout } = userLayout

  return (
    <ResponsiveGridLayout
      className="layout"
      isResizable={true}
      isDraggable={true}
      resizeHandles={['se']}
      onLayoutChange={(layout) => post({ layout, id: userLayout.id })}
      layouts={{
        lg: layout,
        md: layout,
        sm: layout,
        xs: layout,
        xxs: layout,
      }}
      autoSize
      width={window.innerWidth}
      //recalculate row height on window resize
      rowHeight={window.innerHeight / 5 - 20}
      //TODO create layout for breakpoints
      breakpoints={{ lg: 1920, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      maxRows={5}
    >
      {layout.map((item) => (
        <div key={item.i} className={styles.box}>
          <Gridbox>
            <LayoutSwitcher caseName={item.i as LayoutCaseNames} />
          </Gridbox>
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}
