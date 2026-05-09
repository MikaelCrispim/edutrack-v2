import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/20 hover:text-white lg:hidden rounded-lg transition-all duration-200 cursor-pointer"
          title="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <NavLink to="/dashboard" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition-opacity cursor-pointer">
          <span className="text-3xl">📚</span>
          <span>EduTrack</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium opacity-90">👤 Student</span>
        <button
          onClick={handleLogout}
          className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
