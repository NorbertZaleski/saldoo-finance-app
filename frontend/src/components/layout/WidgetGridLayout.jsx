import { useState, useMemo, Children, isValidElement } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import PageLayout from './PageLayout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);
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
      })),
    [children]
  );

  const defaultLayout = useMemo(
    () =>
      items.map((item, i) => ({
        i: item.id,
        x: (i * 4) % 12,
        y: Math.floor(i / 3),
        w: 4,
        h: 4,
      })),
    [items]
  );

  const [layouts, setLayouts] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignorujemy uszkodzony zapis
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
        breakpoints={{ lg: 1024, md: 768, sm: 480, xs: 0 }}
        cols={{ lg: 12, md: 8, sm: 4, xs: 2 }}
        rowHeight={80}
        margin={[16, 16]}
        draggableHandle=".widgetDragHandle"
        compactType="vertical"
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