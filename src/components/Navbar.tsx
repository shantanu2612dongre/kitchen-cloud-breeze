
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { authService } from '../services/api';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className={`font-bold text-2xl transition-colors ${isScrolled ? 'text-primary dark:text-primary' : 'text-white dark:text-white'}`}>Kitchen Cloud</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/" label="Home" isActive={isActive('/')} isScrolled={isScrolled} />
            <NavLink to="/menu" label="Menu" isActive={isActive('/menu')} isScrolled={isScrolled} />
            <NavLink to="/about" label="About Us" isActive={isActive('/about')} isScrolled={isScrolled} />
            <NavLink to="/blog" label="Blog" isActive={isActive('/blog')} isScrolled={isScrolled} />
            
            {isAuthenticated && (
              <NavLink to="/orders" label="Orders" isActive={isActive('/orders')} isScrolled={isScrolled} />
            )}
            
            {isAuthenticated && user && user.name === 'Admin' && (
              <NavLink to="/admin" label="Admin" isActive={isActive('/admin')} isScrolled={isScrolled} />
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/cart" className="relative p-2 group">
              <ShoppingCart className={`h-6 w-6 transition-colors ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'} group-hover:text-primary`} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative ml-3">
                <Button 
                  onClick={() => handleLogout()}
                  variant="ghost"
                  className={`flex items-center text-sm ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'} hover:text-primary`}
                >
                  <User className="h-5 w-5 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  className={`flex items-center text-sm ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'} hover:text-primary`}
                >
                  <User className="h-5 w-5 mr-1" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative p-2 mr-2">
              <ShoppingCart className={`h-6 w-6 ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'} hover:text-primary focus:outline-none`}
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
          <MobileNavLink to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/menu" label="Menu" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/about" label="About Us" onClick={() => setIsMenuOpen(false)} />
          <MobileNavLink to="/blog" label="Blog" onClick={() => setIsMenuOpen(false)} />
          
          {isAuthenticated && (
            <MobileNavLink to="/orders" label="Orders" onClick={() => setIsMenuOpen(false)} />
          )}
          
          {isAuthenticated && user && user.name === 'Admin' && (
            <MobileNavLink to="/admin" label="Admin" onClick={() => setIsMenuOpen(false)} />
          )}
          
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Logout
            </button>
          ) : (
            <MobileNavLink to="/login" label="Login" onClick={() => setIsMenuOpen(false)} />
          )}
        </div>
      </div>
    </nav>
  );
};

// Desktop Nav Link Component
const NavLink = ({ to, label, isActive, isScrolled }: { to: string; label: string; isActive: boolean; isScrolled: boolean }) => (
  <Link 
    to={to} 
    className={`px-3 py-2 text-sm font-medium relative group ${
      isActive 
        ? 'text-primary dark:text-primary' 
        : isScrolled 
          ? 'text-gray-700 dark:text-gray-300' 
          : 'text-white dark:text-white'
    }`}
  >
    {label}
    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform ${isActive ? 'scale-x-100' : ''}`}></span>
  </Link>
);

// Mobile Nav Link Component
const MobileNavLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => (
  <Link 
    to={to} 
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
