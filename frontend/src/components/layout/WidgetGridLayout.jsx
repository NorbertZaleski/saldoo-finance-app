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
const SIZE_TO_COLUMN = { small: 0, medium: 1, large: 2 };
const DEFAULT_SIZE = 'medium';
export const MAX_PER_COLUMN = 3;

function pxToRows(heightPx) {
  return Math.max(1, Math.ceil((heightPx + MARGIN_Y) / (ROW_HEIGHT + MARGIN_Y)));
}

const lockToColumns = (layout, colById, breakpoint) =>
  layout
    .filter((l) => l.i in colById)
    .map((l) => ({ ...l, w: 1, x: breakpoint === 'sm' ? 0 : colById[l.i] }));

const lockAllBreakpoints = (layouts, colById) =>
  Object.fromEntries(
    Object.entries(layouts).map(([bp, layout]) => [bp, lockToColumns(layout, colById, bp)])
  );

const WidgetGridLayout = ({ 
  children, 
  className = '',
  storageKey,
}) => {
  const itemRefs = useRef({});

  const [breakpoint, setBreakpoint] = useState(() =>
    window.innerWidth < 768 ? 'sm' : 'lg'
  );

const items = useMemo(() => {
    const perColumn = {};
    return Children.toArray(children)
      .filter(isValidElement)
      .reduce((acc, child, i) => {
        const size = SIZE_TO_COLUMN[child.props?.size] !== undefined
          ? child.props.size
          : DEFAULT_SIZE;
        const col = SIZE_TO_COLUMN[size];

        // limit widżetów na kolumnę
        perColumn[col] = (perColumn[col] ?? 0) + 1;
        if (perColumn[col] > MAX_PER_COLUMN) {
          console.warn(`Kolumna "${size}" ma już ${MAX_PER_COLUMN} widżety, pomijam`, child.key);
          return acc;
        }

        acc.push({
          id: child.key ?? String(i),
          node: child,
          col,
          h: HEIGHT_MAP[size] ?? DEFAULT_HEIGHT,
        });
        return acc;
      }, []);
  }, [children]);

  const colById = useMemo(
    () => Object.fromEntries(items.map((item) => [item.id, item.col])),
    [items]
  );

  const defaultLayout = useMemo(() => {
    const nextY = {};
    return items.map((item) => {
      const y = nextY[item.col] ?? 0;
      nextY[item.col] = y + item.h;
      return { i: item.id, x: item.col, y, w: 1, h: item.h };
    });
  }, [items]);
  
  const [layouts, setLayouts] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return lockAllBreakpoints(JSON.parse(saved), colById);
      } catch {
        //
      }
    }
    return { lg: defaultLayout };
  });

  const handleLayoutChange = (_currentLayout, allLayouts) => {
    const locked = lockAllBreakpoints(allLayouts, colById);
    setLayouts(locked);
    localStorage.setItem(storageKey, JSON.stringify(locked));
  };

  const keepInColumn = (_layout, _oldItem, newItem, placeholder) => {
    if (breakpoint === 'sm') return;
    const col = colById[newItem.i];
    if (col === undefined) return;
    newItem.x = col;
    if (placeholder) placeholder.x = col;
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
        onBreakpointChange={setBreakpoint}
        onDrag={keepInColumn}
        onDragStop={keepInColumn}
        breakpoints={{ lg: 1024, md: 768, sm: 480 }}
        cols={{ lg: COLS, md: COLS, sm: 1 }}
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