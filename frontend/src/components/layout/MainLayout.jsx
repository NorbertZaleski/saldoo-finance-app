import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div 
      className={`
        flex min-h-screen 
        bg-[url('/src/assets/bg.png')] 
        bg-cover bg-center bg-no-repeat
      `}
    >
      <Sidebar />

      <main className="flex-1 ml-[250px] transition-all duration-300 p-6 md:p-8">
        <div className="min-h-screen backdrop-blur-sm rounded-xl p-4">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;