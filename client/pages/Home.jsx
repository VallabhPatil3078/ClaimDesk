import React from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow px-4 py-12 bg-blue-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">How can we help you?</h1>

        <div className="flex flex-col sm:flex-row gap-6">
          <button className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition">
            Report Lost Item
          </button>
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
            Report Found Item
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
