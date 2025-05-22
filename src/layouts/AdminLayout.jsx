import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaMapMarkedAlt, FaChartLine, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' },
};

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Sidebar */}
      <motion.aside
        initial="open"
        animate="open"
        variants={sidebarVariants}
        className="w-64 bg-primary-800 text-white"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Travel Admin</h2>
        </div>
        
        <div className="px-4 py-2">
          <div className="flex items-center space-x-3 mb-6 bg-primary-700 p-3 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
            <div>
              <p className="font-medium">{currentUser?.name || 'Admin User'}</p>
              <p className="text-xs text-primary-200">{currentUser?.email}</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-4">
          <ul>
            <li>
              <NavLink 
                to="/admin" 
                end
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-6 py-3 ${isActive ? 'bg-primary-700 font-medium' : 'hover:bg-primary-700'}`
                }
              >
                <FaChartLine />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/places" 
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-6 py-3 ${isActive ? 'bg-primary-700 font-medium' : 'hover:bg-primary-700'}`
                }
              >
                <FaMapMarkedAlt />
                <span>Places</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full">
          <div className="border-t border-primary-700 p-4">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-primary-200 hover:text-white w-full"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-header z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-neutral-800">Admin Panel</h1>
            <NavLink 
              to="/"
              className="flex items-center space-x-1 text-primary-600 hover:text-primary-800"
            >
              <FaHome />
              <span>Back to Site</span>
            </NavLink>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;