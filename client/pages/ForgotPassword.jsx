// client/src/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (formData.newPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email: formData.email,
        newPassword: formData.newPassword,
      });

      alert(response.data.message || 'Password reset successful!');
      setFormData({ email: '', newPassword: '', confirmPassword: '' });

      // Redirect to login after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-[85vh] bg-gray-100 pt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl shadow-black/40">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Reset Password</h2>
        <hr className="mb-6 border-t border-gray-300" />

        <form onSubmit={handleReset} className="space-y-4">
          <div className="flex justify-center items-center">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Registered Email"
              required
              className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              required
              className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-3/4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Back to{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
