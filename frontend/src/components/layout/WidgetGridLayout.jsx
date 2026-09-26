import { useState, useMemo, Children, isValidElement } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import PageLayout from './PageLayout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const HEIGHT_MAP = {
  small: 3,
  medium: 4,
  large: 5,
};
const DEFAULT_HEIGHT = 4;
const COLS = 3;

const WidgetGridLayout = ({ 
  children, 
  className = '',
  storageKey = 'dashboard-layout',
}) => {
  const items = useMemo(
    () =>
      Children.toArray(children).filter(isValidElement).map((child, i) => ({
        id: child.key ?? String(i),
        node: child,
        h: HEIGHT_MAP[child.props?.size] ?? DEFAULT_HEIGHT,
      })),
    [children]
  );

  const defaultLayout = useMemo(
    () =>
      items.map((item, i) => ({
        i: item.id,
        x: i % COLS,
        y: Math.floor(i / COLS),
        w: 1,
        h: item.h,
      })),
    [items]
  );

  const [layouts, setLayouts] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        //
      }
    }
    return { lg: defaultLayout };
  });

  const handleLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    localStorage.setItem(storageKey, JSON.stringify(allLayouts));
  };

console.log('items ids:', items.map(i => i.id));
console.log('current layout:', layouts.lg);

  return (
    <PageLayout>
      <ResponsiveGridLayout
        className={`widgetGrid ${className}`}
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1024, md: 768, sm: 480}}
        cols={{ lg: COLS, md: COLS, sm: 1}}
        rowHeight={80}
        margin={[16, 16]}
        draggableHandle=".widgetDragHandle"
        compactType="vertical"
        isResizable={false}
      >
        {items.map(({ id, node }) => (
          <div key={id} className="widgetDraggable">
            {node}
          </div>
        ))}
      </ResponsiveGridLayout>
    </PageLayout>
  );
};

export default WidgetGridLayout;