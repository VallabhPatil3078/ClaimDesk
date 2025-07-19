import React from 'react';
import { FiBell, FiMapPin, FiFileText } from 'react-icons/fi';
import axios from 'axios';

function ItemCard({ item, type = 'found' }) {
  const dateLabel = type === 'found' ? 'Found on' : 'Lost on';
  const defaultImage = '../assets/HomeIcon.png';

  const handleNotify = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/notify-owner', {
        ownerEmail: item.ownerEmail,
        itemTitle: item.title,
      });
      alert(response.data.message || 'Notification sent to the item owner!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send notification.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden hover:shadow-xl transition duration-300">
      {/* Image Section */}
      <div className="h-44 w-full overflow-hidden">
        <img
          src={item.imageUrl || defaultImage}
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 p-4 space-y-2">
        <h2 className="text-lg font-bold text-gray-800 truncate">{item.title}</h2>
        
        <div className="flex items-center text-gray-600 text-sm">
          <FiMapPin className="mr-2 text-blue-500" /> {item.location || 'Location not specified'}
        </div>

        <div className="flex items-start text-gray-600 text-sm">
          <FiFileText className="mr-2 mt-1 text-green-500 flex-shrink-0" />
          <span className="line-clamp-2">{item.description || 'No description provided.'}</span>
        </div>

        <p className="text-xs text-gray-400 mt-1">{dateLabel}: {item.date}</p>
      </div>

      {/* Notify Button */}
      <button
        onClick={handleNotify}
        className="bg-blue-600 text-white py-2 flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-700 transition"
      >
        <FiBell size={18} /> Notify Owner
      </button>
    </div>
  );
}

export default ItemCard;
