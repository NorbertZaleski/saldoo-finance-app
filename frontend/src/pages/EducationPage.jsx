import React from 'react';
import WidgetGridLayout from '../components/layout/WidgetGridLayout.jsx';

const EducationPage = () => {
  return (
    <WidgetGridLayout 
      title="Edukacja" 
      icon="📚"
      gridCols="md:grid-cols-2 lg:grid-cols-3"
    >
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <span className="text-3xl">💰</span>
        <h3 className="font-semibold mt-2">Podstawy oszczędzania</h3>
        <p className="text-sm text-gray-500">10 min czytania</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <span className="text-3xl">📈</span>
        <h3 className="font-semibold mt-2">Inwestowanie dla początkujących</h3>
        <p className="text-sm text-gray-500">15 min czytania</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <span className="text-3xl">💳</span>
        <h3 className="font-semibold mt-2">Jak unikać długów</h3>
        <p className="text-sm text-gray-500">8 min czytania</p>
      </div>
    </WidgetGridLayout>
  );
};

export default EducationPage;