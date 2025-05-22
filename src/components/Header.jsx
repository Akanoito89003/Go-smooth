import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaMapMarkedAlt, FaRoute, FaBars, FaTimes, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ transparent, isLoggedIn, isAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);
  
  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };
  
  const baseClasses = "fixed w-full top-0 z-50 transition-all duration-300";
  const transparentClasses = transparent 
    ? "bg-transparent text-white" 
    : "bg-white shadow-header text-neutral-900";
  
  return (
    <>
      <header className={`${baseClasses} ${transparentClasses}`}>
        <div className="container-custom mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <div className={`text-2xl font-bold ${transparent ? 'text-white' : 'text-primary-600'}`}>
                TravelEase
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 items-center">
              <NavLink 
                to="/places" 
                className={({ isActive }) => 
                  `transition hover:text-primary-600 ${isActive ? `${transparent ? 'text-white font-semibold' : 'text-primary-600 font-semibold'}` : ''}`
                }
              >
                Explore
              </NavLink>
              
              {isLoggedIn && (
                <NavLink 
                  to="/routes" 
                  className={({ isActive }) => 
                    `transition hover:text-primary-600 ${isActive ? `${transparent ? 'text-white font-semibold' : 'text-primary-600 font-semibold'}` : ''}`
                  }
                >
                  Find Routes
                </NavLink>
              )}

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className={`flex items-center space-x-1 ${transparent ? 'text-white hover:text-white/80' : 'text-neutral-700 hover:text-primary-600'}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                      <FaUser size={14} />
                    </div>
                    <span className="font-medium">Account</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <FaCog size={14} />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        >
                          <FaSignOutAlt size={14} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Link
                    to="/login"
                    className={`transition ${transparent ? 'text-white hover:text-white/80' : 'text-neutral-700 hover:text-primary-600'}`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`btn ${transparent ? 'bg-white text-primary-600 hover:bg-neutral-100' : 'btn-primary'} py-1.5 px-4`}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className={`p-2 ${transparent ? 'text-white' : 'text-neutral-700'}`}
              >
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white fixed top-16 left-0 right-0 z-40 shadow-lg"
          >
            <div className="container-custom mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <NavLink 
                  to="/places" 
                  className={({ isActive }) => 
                    `transition p-2 ${isActive ? 'text-primary-600 font-semibold bg-primary-50 rounded' : 'text-neutral-700'}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <FaMapMarkedAlt size={16} />
                    <span>Explore Places</span>
                  </div>
                </NavLink>
                
                {isLoggedIn && (
                  <NavLink 
                    to="/routes" 
                    className={({ isActive }) => 
                      `transition p-2 ${isActive ? 'text-primary-600 font-semibold bg-primary-50 rounded' : 'text-neutral-700'}`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <FaRoute size={16} />
                      <span>Find Routes</span>
                    </div>
                  </NavLink>
                )}
                
                {isLoggedIn ? (
                  <>
                    <NavLink 
                      to="/profile" 
                      className={({ isActive }) => 
                        `transition p-2 ${isActive ? 'text-primary-600 font-semibold bg-primary-50 rounded' : 'text-neutral-700'}`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <FaUser size={16} />
                        <span>Profile</span>
                      </div>
                    </NavLink>
                    
                    {isAdmin && (
                      <NavLink 
                        to="/admin" 
                        className={({ isActive }) => 
                          `transition p-2 ${isActive ? 'text-primary-600 font-semibold bg-primary-50 rounded' : 'text-neutral-700'}`
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <FaCog size={16} />
                          <span>Admin Panel</span>
                        </div>
                      </NavLink>
                    )}
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 p-2 text-neutral-700 border-t border-neutral-200 pt-4"
                    >
                      <FaSignOutAlt size={16} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-neutral-200">
                    <Link
                      to="/login"
                      className="btn btn-outline w-full justify-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary w-full justify-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Space for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;