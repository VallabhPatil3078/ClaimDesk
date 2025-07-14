import React from 'react';
import { FiSearch } from 'react-icons/fi';

const LostItem = () => {
  const lostItems = [
    { id: 1, title: 'Black Wallet', description: 'Lost near the cafeteria', date: '2025-07-13' },
    { id: 2, title: 'iPhone 13', description: 'Left in the library, 2nd floor', date: '2025-07-10' },
    { id: 3, title: 'Backpack', description: 'Blue Nike backpack at bus stop', date: '2025-07-09' },
    { id: 4, title: 'Keychain', description: 'Lost in parking lot near Block C', date: '2025-07-08' },
  ];

  return (
    <div className="min-h-screen bg-[#e6eff8] pt-28 pb-24 px-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-10 text-[#1e293b]">Lost Items</h1>

      {/* Search + Report Button */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search lost items..."
            className="w-full py-3 px-4 pr-12 rounded-md border border-[#cbd5e1] shadow-sm bg-white text-[#1e293b] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          />
          <FiSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-[#64748b] text-xl" />
        </div>
        {/* Report Button */}
        <button className="bg-[#3b82f6] text-white px-6 py-3 rounded-md shadow hover:bg-[#2563eb] transition duration-200">
          Report Lost Item
        </button>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostItems.map((item) => (
          <div key={item.id} className="bg-[#f8fafc] rounded-xl shadow-md flex overflow-hidden h-40 border border-[#cbd5e1]">
            {/* Info Section */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#1e293b]">{item.title}</h2>
                <p className="text-[#475569] text-sm mt-1">{item.description}</p>
              </div>
              <p className="text-xs text-[#94a3b8]">Reported on {item.date}</p>
            </div>
            {/* Map Placeholder */}
            <div className="w-1/3 bg-[#dbeafe] flex items-center justify-center text-[10px] text-[#475569]">
              Map
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostItem;
