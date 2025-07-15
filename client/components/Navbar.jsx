import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `text-gray-700 hover:text-blue-600 ${isActive ? 'text-red-600 font-semibold' : ''}`;

  return (
    <nav className="bg-white shadow-md px-6 sm:px-8 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">ClaimDesk</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/login" className={linkClasses}>Login</NavLink>
          <NavLink to="/signup" className={linkClasses}>Sign Up</NavLink>
          <NavLink to="/about" className={linkClasses}>About</NavLink>
        </div>

        {/* Hamburger icon (mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4">
          <NavLink to="/" className={linkClasses} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/login" className={linkClasses} onClick={() => setIsOpen(false)}>Login</NavLink>
          <NavLink to="/signup" className={linkClasses} onClick={() => setIsOpen(false)}>Sign Up</NavLink>
          <NavLink to="/about" className={linkClasses} onClick={() => setIsOpen(false)}>About</NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
