import PageLayout from './PageLayout';

const WidgetGridLayout = ({ 
  children, 
  className = '',
  gridCols = 'md:grid-cols-2 lg:grid-cols-3'
}) => {
  return (
    <PageLayout>

      <div className={`
        grid grid-cols-1 ${gridCols} gap-4 md:gap-6
        ${className}
      `}>
        {children}
      </div>
    </PageLayout>
  );
};

export default WidgetGridLayout;