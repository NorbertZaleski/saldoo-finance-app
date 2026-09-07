import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '/src/assets/logo.png';
import logosm from '/src/assets/logo-sm.png';

import {LayoutDashboard, ArrowLeftRight, Wallet, Brain, BookOpen, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

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
      fixed top-1/2 -translate-y-1/2 left-5 h-4/5 text-white bg-bg rounded-2xl
      flex flex-col 
      transition-[250px] duration-300 ease-out
      shadow-2xl z-50 items-center justify-start p-4 md-2 overflow-hidden 
      ${isCollapsed ? 'w-[130px]' : 'w-[250px]'} 
    `}>
      
      <div className='flex flex-col items-center justify-between'>
        {/*Logo*/}
        <div className="flex items-center justify-center px-4 py-2 flex-shrink-0 shadow-lg/25">
          {isCollapsed ? (
          <div className="py-2"><img className='object-cover w-[60px] h-auto' src={logosm} alt="Logo"/></div>
          ) : (
            <div className="py-2"><img className='object-cover' src={logo} alt="Logo"/></div>
          )}
        </div>
        {/*Przycisk zwijania*/}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-3 w-6 h-6 bg-primary-500 hover:bg-primary-600 
                    text-white text-xs rounded-lg flex items-center justify-center border-[0.5px]
                    transition-all duration-200 shadow-md hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          {isCollapsed ? <ChevronRight/> : <ChevronLeft/>}
        </button>
      </div>

      {/*Menu*/}
      <div className='flex-1 flex flex-col justify-center overflow-y-auto'>
        <nav className="flex flex-col justify-center px-3 py-6 space-y-6 overflow-y-auto max-h-fit w-fit rounded-xl">
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
                ${isCollapsed ? 'justify-left px-2' : ''}
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