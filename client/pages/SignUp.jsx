// SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { signup as apiSignup } from '../src/api/api'; // Renamed to avoid conflict
import { useAuth } from '../src/context/AuthContext'; // Import useAuth hook

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const { login: contextLogin } = useAuth(); // Get the login function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      console.error('Name must contain only letters and spaces.'); // Log error instead of alert
      // You might want to set a state here to display an error message to the user on the UI
      return;
    }

    try {
      const res = await apiSignup(formData); // Call your API signup function
      const { token, user } = res.data; // Assuming your backend returns { token, user } after signup

      // Use the login function from AuthContext to update global state and localStorage
      contextLogin(token, user);

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      console.log(res.data.message || 'Signup successful!'); // Log success instead of alert
    } catch (err) {
      console.error('Signup failed:', err.response?.data?.message || err.message);
      // You might want to set a state here to display an error message to the user on the UI
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl shadow-black/40">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">New Account</h2>
        <hr className="mb-4 sm:mb-6 border-t border-gray-300" />
        <form onSubmit={handleSignUp} className="space-y-3 sm:space-y-4">
          <div className="flex justify-center">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full sm:w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex justify-center">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full sm:w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex justify-center">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full sm:w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex justify-center">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full sm:w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-3/4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Signup
            </button>
          </div>
        </form>

        <p className="text-xs sm:text-sm text-center text-gray-600 mt-3 sm:mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>

        <div className="flex items-center my-4 sm:my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 sm:px-3 text-gray-500 text-xs sm:text-sm">Or Continue with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <a href="#" className="flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <img src="../assets/google.svg" alt="Google" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Google</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <img src="../assets/facebook.svg" alt="Facebook" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Facebook</span>
          </a>
          <a href="#" className="flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-md hover:bg-gray-100 transition">
            <img src="../assets/apple.svg" alt="Apple" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Apple ID</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
