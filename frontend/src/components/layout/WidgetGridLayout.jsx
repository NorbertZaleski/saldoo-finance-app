import { useState, useMemo, Children, isValidElement, useEffect, useRef } from 'react';
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
const ROW_HEIGHT = 80;
const MARGIN_Y = 4;


function pxToRows(heightPx) {
  return Math.max(1, Math.ceil((heightPx + MARGIN_Y) / (ROW_HEIGHT + MARGIN_Y)));
}

const WidgetGridLayout = ({ 
  children, 
  className = '',
  storageKey,
}) => {
  const itemRefs = useRef({});

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

 useEffect(() => {
    const observers = items.map((item) => {
      const node = itemRefs.current[item.id];
      if (!node) return null;

      const observer = new ResizeObserver(([entry]) => {
        const neededRows = pxToRows(entry.target.scrollHeight);
        setLayouts((prev) => {
          const lg = prev.lg ?? [];
          const existing = lg.find((l) => l.i === item.id);
          if (!existing || existing.h === neededRows) return prev;
          const updatedLg = lg.map((l) => (l.i === item.id ? { ...l, h: neededRows } : l));
          const updated = { ...prev, lg: updatedLg };
          localStorage.setItem(storageKey, JSON.stringify(updated));
          return updated;
        });
      });

      observer.observe(node);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [items, storageKey]);

  return (
    <PageLayout>
      <ResponsiveGridLayout
        className={`widgetGrid ${className}`}
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1024, md: 768, sm: 480}}
        cols={{ lg: COLS, md: COLS, sm: 1}}
        rowHeight={ROW_HEIGHT}
        margin={[16, MARGIN_Y]}
        draggableHandle=".widgetDragHandle"
        compactType="vertical"
        isResizable={false}
      >
        {items.map(({ id, node }) => (
          <div key={id} className="widgetDraggable">
            <div ref={(el) => (itemRefs.current[id] = el)} className="w-full h-fit">
              {node}
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </PageLayout>
  );
};

export default WidgetGridLayout;