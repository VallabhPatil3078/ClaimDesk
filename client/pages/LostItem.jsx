import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { fetchLostItems } from '../src/api/api'; // Make sure this is defined in your api.js

function LostItem() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      setLoading(true);
      const params = {
        status: 'lost',
        ...(filterLocation && { location: filterLocation }),
        ...(filterDate && { date: filterDate }),
      };

      const res = await fetchLostItems(params);
      let items = res.data;

      // Apply searchTerm filter client-side
      if (searchTerm) {
        items = items.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
        );
      }

      setLostItems(items);
    } catch (error) {
      console.error('Failed to fetch lost items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [searchTerm, filterDate, filterLocation]);

  return (
    <div className="flex flex-col min-h-screen bg-[#e6eff8]">
      <main className="flex-grow pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 text-[#1e293b]">
          Lost Items
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

          {/* Report Lost Item button */}
          <button
            onClick={() => navigate('/report-lost')}
            className="w-full lg:w-1/4 bg-red-600 text-white py-2 sm:py-3 rounded-md shadow hover:bg-red-700 transition duration-200"
          >
            Report Lost Item
          </button>
        </div>

        {/* Item cards grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {loading ? (
            <p className="text-center col-span-full text-[#64748b]">Loading...</p>
          ) : lostItems.length === 0 ? (
            <p className="text-center col-span-full text-[#64748b]">No lost items found.</p>
          ) : (
            lostItems.map((item) => (
              <ItemCard key={item._id} item={item} type="lost" />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default LostItem;
