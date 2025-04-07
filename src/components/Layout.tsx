
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Moon, Sun } from 'lucide-react';

const Layout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Dark Mode Toggle */}
      <button 
        onClick={toggleDarkMode}
        className="fixed right-4 bottom-4 z-50 p-3 rounded-full bg-background border border-border shadow-md hover:scale-105 transition-transform"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
      </button>
      
      <main className="flex-grow">
        <div className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
