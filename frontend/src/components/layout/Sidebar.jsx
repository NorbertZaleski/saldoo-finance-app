import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '/src/assets/logo.png';

const menuItems = [
  { id: 'dashboard', label: 'Kokpit', icon: '🏠', path: '/app/dashboard' },
  { id: 'transactions', label: 'Transakcje', icon: '💰', path: '/app/transactions' },
  { id: 'budgets', label: 'Budżet', icon: '📊', path: '/app/budgets' },
  { id: 'analysis', label: 'Analiza', icon: '📈', path: '/app/analysis' },
  { id: 'education', label: 'Edukacja', icon: '📚', path: '/app/education' },
  { id: 'settings', label: 'Ustawienia', icon: '⚙️', path: '/app/settings' },
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
      ${isCollapsed ? 'w-[72px]' : 'w-[270px]'}
    `}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-white/20 bg-bg/60 rounded-2xl px-4 py-2 flex-shrink-0">
        {isCollapsed ? (
          <span className="text-3xl">💰</span>
        ) : (
          <div className="py-2"><img className='object-cover' src={logo} alt="Logo"/></div>
        )}
      </div>

      {/* Przycisk zwijania */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 -right-3 w-6 h-6 bg-primary-500 hover:bg-primary-600 
                   text-white text-xs rounded-full flex items-center justify-center
                   transition-all duration-200 shadow-md hover:shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      {/* Menu */}
      <div className='flex-1 flex flex-col justify-center overflow-y-auto'>
        <nav className="flex flex-col justify-center px-3 py-4 space-y-1 overflow-y-auto max-h-fit bg-gray-900 rounded-xl">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-all duration-200 text-gray-400 hover:text-white
                hover:bg-white/10 
                ${isActive ? 'bg-primary-500/20 text-primary-400' : ''}
                ${isCollapsed ? 'justify-center px-2' : ''}
              `}
            >
              <span className="text-2xl leading-none">{item.icon}</span>
              {!isCollapsed && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
    </div>
    </aside>
  );
};

export default Sidebar;