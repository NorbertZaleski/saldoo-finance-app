import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
      fixed top-0 left-0 h-screen bg-gray-900 text-white
      flex flex-col transition-all duration-300 ease-in-out
      shadow-2xl z-50
      ${isCollapsed ? 'w-[72px]' : 'w-[250px]'}
    `}>
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        {isCollapsed ? (
          <span className="text-3xl">💰</span>
        ) : (
          <span className="text-2xl font-bold tracking-tight">Saldoo</span>
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
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
            <span className="text-xl leading-none">{item.icon}</span>
            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Stopka - Wylogowanie */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
            text-gray-400 hover:text-red-400 hover:bg-red-500/10
            transition-all duration-200
            ${isCollapsed ? 'justify-center px-2' : ''}
          `}
        >
          <span className="text-xl leading-none">🚪</span>
          {!isCollapsed && (
            <span className="text-sm font-medium whitespace-nowrap">Wyloguj</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;