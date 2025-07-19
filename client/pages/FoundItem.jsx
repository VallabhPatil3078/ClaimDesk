import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { fetchItems } from '../src/api/api'; // ✅ Import API function
import ItemCard from '../components/ItemCard';

function FoundItem() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const filters = { status: 'found' };
        if (filterLocation) filters.location = filterLocation;
        if (filterDate) filters.date = filterDate;

        const response = await fetchItems(filters);
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch found items:', error);
      }
    };

    fetchFoundItems();
  }, [filterDate, filterLocation]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#e6eff8]">
      <main className="flex-grow pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 text-[#1e293b]">
          Found Items
        </h1>

        {/* Filters */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch justify-center gap-4 mb-10">
          <div className="relative w-full lg:w-1/4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by item name..."
              className="w-full py-2 px-4 pr-10 rounded-md border border-[#cbd5e1] bg-white"
            />
            <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
          </div>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full lg:w-1/4 py-2 px-4 rounded-md border border-[#cbd5e1] bg-white"
          />

          <input
            type="text"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            placeholder="Filter by location..."
            className="w-full lg:w-1/4 py-2 px-4 rounded-md border border-[#cbd5e1] bg-white"
          />

          <button
            onClick={() => navigate('/report-found')}
            className="w-full lg:w-1/4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Report Found Item
          </button>
        </div>

        {/* Item cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} type="found" />
          ))}
        </div>
      </main>
    </div>
  );
}

export default FoundItem;
