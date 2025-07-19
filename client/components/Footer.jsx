import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t mt-auto py-4 px-4 text-center text-gray-600 text-sm shadow-inner">
      <p className="mb-1">&copy; {new Date().getFullYear()} <span className="font-semibold text-gray-800">ClaimDesk</span>. All rights reserved.</p>
      <p className="text-xs text-gray-400">
        Helping you connect lost and found items with ease.
      </p>
    </footer>
  );
}

export default Footer;
