import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

function FoundItem() {
  const navigate = useNavigate();

  const foundItems = [
    { id: 1, title: 'Silver Ring', description: 'Found near the auditorium', date: '2025-07-12' },
    { id: 2, title: 'Pencil Case', description: 'Found in classroom 304', date: '2025-07-11' },
    { id: 3, title: 'Smartwatch', description: 'Found on the football ground', date: '2025-07-10' },
    { id: 4, title: 'Spectacles', description: 'Found in the library', date: '2025-07-09' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#e6eff8]">
      <main className="flex-grow pt-12 sm:pt-16 pb-12 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 text-[#1e293b]">
          Found Items
        </h1>

        {/* Search bar + button */}
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search found items..."
              className="w-full py-2 sm:py-3 px-3 sm:px-4 pr-10 sm:pr-12 rounded-md border border-[#cbd5e1] shadow-sm bg-white text-[#1e293b] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
            <FiSearch className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 text-[#64748b] text-lg sm:text-xl" />
          </div>
          <button
            onClick={() => navigate('/report-found')}
            className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow hover:bg-green-700 transition duration-200"
          >
            Report Found Item
          </button>
        </div>

        {/* Item cards grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {foundItems.map((item) => (
            <ItemCard key={item.id} item={item} type="found" />
          ))}
        </div>
      </main>
    </div>
  );
}

export default FoundItem;
