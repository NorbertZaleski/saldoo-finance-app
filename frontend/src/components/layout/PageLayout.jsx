import React from 'react';

const PageLayout = ({ children, className = '' }) => {
  return (
    <div className={`
      min-h-screen
      p-4 md:p-6 lg:p-8
      ${className}
    `}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;