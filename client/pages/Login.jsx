import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Login API logic here
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center bg-[#f0f4f8] p-6">
        <div className="w-full max-w-md">
          <img
            src="/assets/loginImage.svg"
            alt="Lost and Found"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl shadow-black/40">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
          <hr className="mb-6 border-t border-gray-300" />
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            <div className="flex justify-between text-sm text-blue-600 mt-2">
              <Link to="/forgot-password">Forgot Password?</Link>
              <Link to="/signup" className="hover:underline">Create New Account</Link>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">Or Continue with</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#" className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                <img src="/assets/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-sm">Google</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                <img src="/assets/facebook.svg" alt="Facebook" className="w-5 h-5" />
                <span className="text-sm">Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                <img src="/assets/apple.svg" alt="Apple" className="w-5 h-5" />
                <span className="text-sm">Apple ID</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
