import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-blue-50 text-gray-900 min-h-screen">
      {/* Adjust height below navbar (e.g., if navbar is 4rem tall) */}
      <div
        className="flex flex-col items-center justify-center px-4 py-12"
        style={{ minHeight: 'calc(100vh - 10rem)' }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">How can we help you?</h1>

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate('/lost-item')}
            className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
          >
            Report Lost Item
          </button>

          <button
            onClick={() => navigate('/found-item')}
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
