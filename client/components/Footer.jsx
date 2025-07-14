import React from 'react'

function Footer() {
    return (
        <footer className="text-center text-sm text-gray-500 py-4 bg-white border-t mt-auto">
            &copy; {new Date().getFullYear()} ClaimDesk. All rights reserved.
        </footer>
    )
}

export default Footer
