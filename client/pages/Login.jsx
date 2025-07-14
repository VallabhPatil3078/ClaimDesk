import React, {useState} from 'react'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) =>{
        // Login api
    }

  return (
    <div className='flex h-screen'>
      <div className='w-1/2 flex h-full justify-center items-center'>
        <div className='w-3/5 h-auto'>
          <img src="../assets/loginImage.svg" alt="lost and found" />
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl shadow-black/40">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
          <hr className="mb-6 border-t border-gray-300" />
          <form onSubmit={handleLogin} className="space-y-4">
            <div className='flex justify-center items-center'>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className='flex justify-center items-center'>
              <input
                type="password"
                required
                value={password}
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
                className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className='flex justify-center items-center'>
              <button
                type="submit"
                className="w-3/4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>

            <div className="flex justify-between w-3/4 mx-auto text-sm text-blue-600">
              <a href="#" className="hover:underline">Forgot Password?</a>
              <a href="#" className="hover:underline">Create New Account</a>
            </div>

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

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
