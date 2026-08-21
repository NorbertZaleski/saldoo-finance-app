import React from 'react';
import PageLayout from './PageLayout';

const WidgetGridLayout = ({ 
  title, 
  icon, 
  children, 
  className = '',
  gridCols = 'md:grid-cols-2 lg:grid-cols-3'
}) => {
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {icon} {title}
        </h1>
        <p className="text-gray-500 mt-1">
          Przeglądaj i zarządzaj swoimi danymi
        </p>
      </div>

      {/* Grid z kafelkami */}
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