
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { authService } from '../services/api';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-culinary-600 font-bold text-2xl">CloudKitchen</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-culinary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-culinary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
              Menu
            </Link>
            {isAuthenticated && (
              <Link to="/orders" className="text-gray-700 hover:text-culinary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Orders
              </Link>
            )}
            {isAuthenticated && user && user.name === 'Admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-culinary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Admin
              </Link>
            )}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-culinary-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-culinary-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative ml-3">
                <Button 
                  onClick={() => handleLogout()}
                  variant="ghost"
                  className="flex items-center text-sm text-gray-700 hover:text-culinary-600"
                >
                  <User className="h-5 w-5 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="flex items-center text-sm text-gray-700 hover:text-culinary-600">
                  <User className="h-5 w-5 mr-1" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative p-2 mr-2">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-culinary-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-culinary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-culinary-500"
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-culinary-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-culinary-600 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </Link>
          {isAuthenticated && (
            <Link 
              to="/orders" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-culinary-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
          )}
          {isAuthenticated && user && user.name === 'Admin' && (
            <Link 
              to="/admin" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-culinary-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-culinary-600 hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-culinary-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
