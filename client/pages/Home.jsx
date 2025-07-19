import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-gradient-to-b from-blue-100 via-blue-50 to-white text-gray-900 min-h-screen">
      {/* Content container */}
      <div
        className="flex flex-col items-center justify-center px-6 sm:px-8 py-16 sm:py-20 text-center"
        style={{ minHeight: 'calc(100vh - 10rem)' }}
      >
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 leading-tight drop-shadow-md">
          How can we help you?
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl mb-10 max-w-xl">
          Lost or found something? We’re here to connect you with the right people.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg justify-center">
          <button
            onClick={() => navigate('/lost-item')}
            className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
          >
            <FiAlertCircle className="text-2xl" />
            Report Lost Item
          </button>

          <button
            onClick={() => navigate('/found-item')}
            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
          >
            <FiCheckCircle className="text-2xl" />
            Report Found Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
  