import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '/src/assets/logo.png';
import logosm from '/src/assets/logo-sm.png';

import {LayoutDashboard, ArrowLeftRight, Wallet, Brain, BookOpen, Settings } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Kokpit', icon: LayoutDashboard, path: '/app/dashboard' },
  { id: 'transactions', label: 'Transakcje', icon: ArrowLeftRight, path: '/app/transactions' },
  { id: 'budgets', label: 'Budżet', icon: Wallet, path: '/app/budgets' },
  { id: 'analysis', label: 'Analiza', icon: Brain, path: '/app/analysis' },
  { id: 'education', label: 'Edukacja', icon: BookOpen, path: '/app/education' },
  { id: 'settings', label: 'Ustawienia', icon: Settings, path: '/app/settings' },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className={`
      fixed top-0 left-0 h-screen bg-transparent text-white
      flex flex-col transition-all duration-300 ease-in-out
      shadow-2xl z-50 items-center justify-start p-4
      ${isCollapsed ? 'w-[130px]' : 'w-[270px]'}
    `}>
      {/*Logo*/}
      <div className="flex items-center justify-center border-[0.5px] border-solid border-white/20 bg-bg/60 rounded-2xl px-4 py-2 
      flex-shrink-0 shadow-lg/25">
        {isCollapsed ? (
         <div className="py-2"><img className='object-cover w-[59px] h-auto' src={logosm} alt="Logo"/></div>
        ) : (
          <div className="py-2"><img className='object-cover' src={logo} alt="Logo"/></div>
        )}
      </div>
      {/*Przycisk zwijania*/}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 -right-3 w-6 h-6 bg-primary-500 hover:bg-primary-600 
                   text-white text-xs rounded-full flex items-center justify-center
                   transition-all duration-200 shadow-md hover:shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        {isCollapsed ? '→' : '←'}
      </button>
      
      {/*Menu*/}
      <div className='flex-1 flex flex-col justify-center overflow-y-auto'>
        <nav className="flex flex-col justify-center px-3 py-6 space-y-6 overflow-y-auto max-h-fit w-fit bg-bg/40 backdrop-blur-md border-[0.5px] border-solid border-white/20 rounded-xl">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-all duration-200 text-white font-medium hover:text-white bg-highlight
                hover:bg-white/10 border-[0.5px] border-solid border-white/20
                ${isActive ? 'bg-primary-500/20 text-primary-400' : ''}
                ${isCollapsed ? 'justify-center px-2' : ''}
              `}
            >
              <Icon size={32}
              className='flex-shrink-0'
              strokeWidth={1.5}
              />
              {!isCollapsed && (
                <span className="text-lg font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
          })}
        </nav>
    </div>
      {/*Przycisk wylogowania tymczasowo tutaj*/}
    <div className='px-3 py-5'>
      <span onClick={handleLogout}>Logout</span>
    </div>


    </aside>
  );
};

export default Sidebar;