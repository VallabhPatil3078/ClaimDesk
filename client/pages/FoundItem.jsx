import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

function FoundItem() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  const foundItems = [
    { id: 1, title: 'Silver Ring', description: 'Found near the auditorium', date: '2025-07-12', location: 'Auditorium' },
    { id: 2, title: 'Pencil Case', description: 'Found in classroom 304', date: '2025-07-11', location: 'Classroom 304' },
    { id: 3, title: 'Smartwatch', description: 'Found on the football ground', date: '2025-07-10', location: 'Football Ground' },
    { id: 4, title: 'Spectacles', description: 'Found in the library', date: '2025-07-09', location: 'Library' },
  ];

  const filteredItems = foundItems.filter(
    (item) =>
      (!searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterDate || item.date === filterDate) &&
      (!filterLocation || item.location.toLowerCase().includes(filterLocation.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#e6eff8]">
      <main className="flex-grow pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 text-[#1e293b]">
          Found Items
        </h1>

        {/* Search, filters, and button */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          {/* Search bar (by item name) */}
          <div className="relative w-full lg:w-1/4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by item name..."
              className="w-full py-2 sm:py-3 px-3 sm:px-4 pr-10 sm:pr-12 rounded-md border border-[#cbd5e1] shadow-sm bg-white text-[#1e293b] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
            <FiSearch className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2 text-[#64748b] text-lg sm:text-xl" />
          </div>

          {/* Filter by Date */}
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full lg:w-1/4 py-2 sm:py-3 px-3 sm:px-4 rounded-md border border-[#cbd5e1] shadow-sm bg-white text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          />

          {/* Filter by Location */}
          <input
            type="text"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            placeholder="Filter by location..."
            className="w-full lg:w-1/4 py-2 sm:py-3 px-3 sm:px-4 rounded-md border border-[#cbd5e1] shadow-sm bg-white text-[#1e293b] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          />

          {/* Report Found Item button */}
          <button
            onClick={() => navigate('/report-found')}
            className="w-full lg:w-1/4 bg-green-600 text-white py-2 sm:py-3 rounded-md shadow hover:bg-green-700 transition duration-200"
          >
            Report Found Item
          </button>
        </div>

        {/* Item cards grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} type="found" />
          ))}
        </div>
      </main>
    </div>
  );
}

export default FoundItem;
