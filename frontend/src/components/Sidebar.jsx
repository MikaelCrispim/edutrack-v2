import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { path: '/dashboard', label: 'Painel', icon: '📊' },
    { path: '/subjects', label: 'Minhas Disciplinas', icon: '📚' },
    { path: '/subjects/new', label: 'Nova Disciplina', icon: '✏️' },
    { path: '/tasks', label: 'Tarefas', icon: '✅' },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 border-r border-blue-100 dark:border-slate-700 shadow-lg dark:shadow-slate-900/50 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0 lg:top-0`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;