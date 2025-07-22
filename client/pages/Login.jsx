// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as apiLogin } from "../src/api/api";
import { useAuth } from "../src/context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await apiLogin({ email, password });
      const { token, user } = res.data;

      contextLogin(token, user);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#f0f4f8] p-6">
          <div className="w-3/4 max-w-sm sm:max-w-md">
            <img
              src="/assets/loginImage.svg"
              alt="Lost and Found"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Login Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-10 sm:px-8 sm:py-12">
          <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-2xl shadow-black/40">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
              Login
            </h2>
            <hr className="mb-4 sm:mb-6 border-t border-gray-300" />
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>

              <div className="flex justify-between text-xs sm:text-sm text-blue-600 mt-2">
                <Link to="/forgot-password">Forgot Password?</Link>
                <Link to="/signup" className="hover:underline">
                  Create New Account
                </Link>
              </div>

              {/* Divider */}
              <div className="flex items-center my-4 sm:my-6">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-2 text-gray-500 text-xs sm:text-sm">
                  Or Continue with
                </span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                {[
                  {
                    href: "http://localhost:5000/api/auth/google",
                    img: "/assets/google.svg",
                    text: "Google",
                  },
                  {
                    href: "http://localhost:5000/api/auth/facebook",
                    img: "/assets/facebook.svg",
                    text: "Facebook",
                  },
                  { href: "#", img: "/assets/apple.svg", text: "Apple ID" },
                ].map((btn, index) => (
                  <a
                    key={index}
                    href={btn.href}
                    className="flex items-center justify-center gap-3 px-4 py-2 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all duration-200 w-full sm:w-auto"
                  >
                    <img
                      src={btn.img}
                      alt={btn.text}
                      className="w-5 h-5 object-contain"
                    />
                    <span className="text-sm font-medium">{btn.text}</span>
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
