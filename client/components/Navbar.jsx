import React from 'react'

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
            <h1 className="text-2xl font-bold text-blue-600">ClaimDesk</h1>
            <div className="space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Login</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Sign Up</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
            </div>
        </nav>
    )
}

export default Navbar
