import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 sm:px-8 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">ClaimDesk</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Login</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Sign Up</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
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
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Login</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Sign Up</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
