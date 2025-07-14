import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add signup API logic here

    const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(formData.name)) {
    alert('Name must contain only letters and spaces.');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl shadow-black/40">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Signup</h2>
        <hr className="mb-6 border-t border-gray-300" />
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className='flex justify-center items-center'>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          </div>
          <div className='flex justify-center items-center'>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          </div>
          <div className= 'flex justify-center items-center'>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          </div>
          <div className= 'flex justify-center items-center'>
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
          <div className= 'flex justify-center items-center'>
            <button type="submit"
                className="w-3/4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Signup
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>

        <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">Or Continue with</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

        <div className="flex justify-center gap-4">
              <a href="#" className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                <img src="../assets/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-sm">Google</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                <img src="../assets/facebook.svg" alt="Facebook" className="w-5 h-5" />
                <span className="text-sm">Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                <img src="../assets/apple.svg" alt="Apple" className="w-5 h-5" />
                <span className="text-sm">Apple ID</span>
              </a>
            </div>    

      </div>
    </div>
  );
}

export default Signup;
