import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import LostItem from './LostItem';
import FoundItem from './FoundItem';

function Home() {
  const navigate = useNavigate(); // ✅ Hook to programmatically navigate

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">

      <div className="flex flex-col items-center justify-center flex-grow px-4 py-12 bg-blue-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">How can we help you?</h1>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate('/lost-item')} // ✅ Navigate to LostItem page
            className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
          >
            Report Lost Item
          </button>

          <button
            onClick={() => navigate('/found-item')} // ✅ Navigate to FoundItem page
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Report Found Item
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;
