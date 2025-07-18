import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (formData.newPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // 👉 Replace this with your actual backend API call
    console.log('Resetting password for:', formData.email);
    alert('Password reset successful!');
    setFormData({ email: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
              className="w-3/4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Reset Password
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
