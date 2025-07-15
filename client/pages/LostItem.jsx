import React from 'react';
import { FiSearch } from 'react-icons/fi';
import ItemCard from '../components/ItemCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LostItem() {
  const lostItems = [
    { id: 1, title: 'Black Wallet', description: 'Lost near the cafeteria', date: '2025-07-13' },
    { id: 2, title: 'iPhone 13', description: 'Left in the library, 2nd floor', date: '2025-07-10' },
    { id: 3, title: 'Backpack', description: 'Blue Nike backpack at bus stop', date: '2025-07-09' },
    { id: 4, title: 'Keychain', description: 'Lost in parking lot near Block C', date: '2025-07-08' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#e6eff8]">
      <Navbar />

      <main className="flex-grow pt-16 pb-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-[#1e293b]">Lost Items</h1>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search lost items..."
              className="w-full py-3 px-4 pr-12 rounded-md border border-[#cbd5e1] shadow-sm bg-white text-[#1e293b] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
            <FiSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#64748b] text-xl" />
          </div>
          <button className="bg-red-600 text-white px-6 py-3 rounded-md shadow hover:bg-red-700 transition duration-200">
            Report Lost Item
          </button>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lostItems.map((item) => (
            <ItemCard key={item.id} item={item} type="lost" />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LostItem;
