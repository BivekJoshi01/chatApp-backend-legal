import React, { useState } from 'react';
import { Outlet } from 'react-router';
import UniLogo from "../assets/Office/UniversalLogo.jpeg"
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const UserPageLayout: React.FC = () => {
  const [showPromo, setShowPromo] = useState(true);

  return (
    <main className="text-stone-900 bg-stone-100 min-h-screen font-sans">
      {showPromo && (
        <div className="bg-yellow-100 text-center py-2 px-4 text-yellow-800 flex justify-between items-center">
          <p className="text-sm">🎉 Free shipping on orders over $50!</p>
          <button onClick={() => setShowPromo(false)} className="text-xs text-yellow-800 font-semibold">
            ✕
          </button>
        </div>
      )}

      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="container mx-auto flex flex-wrap justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-13 h-13 flex-shrink-0">
              <img src={UniLogo} alt="Universal Stationery Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl md:text-xl font-bold text-blue-700 break-words">
              Universal Stationery Suppliers
            </h1>

          </div>

          <div className="flex gap-6 items-center">
            <ul className="hidden md:flex gap-6 text-stone-700 font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">Categories</li>
              <li className="hover:text-blue-600 cursor-pointer">Track</li>
              <li className="hover:text-blue-600 cursor-pointer">Contact</li>
            </ul>
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1.5 border border-stone-300 rounded-md text-sm"
            />
          </div>
        </nav>
      </header>


      <Outlet />
    <footer className=" py-14 px-6 mt-16 border-t border-stone-300">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-stone-700">
        {/* Logo & About */}
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-2">StationeryHub</h4>
          <p className="text-sm leading-relaxed max-w-xs">
            Bringing quality to your desk since 2020.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {['Home', 'Products', 'Track Order', 'Support'].map((link) => (
              <li key={link} className="hover:text-indigo-600 transition-colors cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <div className="flex items-start gap-3 mb-2 text-sm">
            <FaEnvelope className="text-indigo-500 mt-1" />
            <span>support@stationeryhub.com</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <FaPhoneAlt className="text-green-500 mt-1" />
            <span>+1 234 567 890</span>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-stone-500">
        © 2025 <span className="font-medium">StationeryHub</span>. All rights reserved.
      </div>
    </footer>
    </main>
  );
};

export default UserPageLayout;
