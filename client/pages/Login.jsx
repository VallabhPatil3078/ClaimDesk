// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { login as apiLogin } from '../src/api/api'; // Renamed to avoid conflict with context's login
import { useAuth } from '../src/context/AuthContext'; // Import useAuth hook

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: contextLogin } = useAuth(); // Get the login function from AuthContext and rename it
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call your API login function
      const res = await apiLogin({ email, password });
      const { token, user } = res.data; // Assuming your backend returns { token, user }

      // Use the login function from AuthContext to update global state and localStorage
      contextLogin(token, user);

      if (user.role === 'admin') {
        navigate('/admin'); // Admin Page
      } else {
        navigate('/'); // Normal users
      }
      console.log('Login successful!'); // Log success instead of alert
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      // You might want to set a state here to display an error message to the user on the UI
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main content */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-[#f0f4f8] p-4 sm:p-6">
          <div className="w-full max-w-xs sm:max-w-md">
            <img
              src="/assets/loginImage.svg"
              alt="Lost and Found"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Login Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-4 sm:px-6 py-8 sm:py-12">
          <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl shadow-black/40">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">Login</h2>
            <hr className="mb-4 sm:mb-6 border-t border-gray-300" />
            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
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

              <div className="flex justify-between text-xs sm:text-sm text-blue-600 mt-2">
                <Link to="/forgot-password">Forgot Password?</Link>
                <Link to="/signup" className="hover:underline">Create New Account</Link>
              </div>

              {/* Divider */}
              <div className="flex items-center my-4 sm:my-6">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-2 sm:px-3 text-gray-500 text-xs sm:text-sm">Or Continue with</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                {['google', 'facebook', 'apple'].map((provider) => (
                  <a
                    key={provider}
                    href="#"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-md hover:bg-gray-100 transition"
                  >
                    <img src={`/assets/${provider}.svg`} alt={provider} className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm capitalize">
                      {provider === 'apple' ? 'Apple ID' : provider}
                    </span>
                  </a>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;