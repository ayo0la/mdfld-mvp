import React, { useState } from 'react';
import SearchBar from './ui/custom/SearchBar';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-dark-1 text-white overflow-visible">
      {/* Top Bar */}
      <div className="bg-primary text-dark-1 text-center text-sm py-2">
        Free standard shipping on all orders over $200.
      </div>
      {/* Main Header */}
      <div className="container mx-auto flex justify-between items-center h-14 px-4">
        {/* Left Section: Logo and Web Search Bar (visible on md and up) */}
        <div className="text-xl font-bold flex items-center">
          <img src="/images/mdfld-logo.png" alt="mdfld logo" className="h-24 mr-2" /> {/* Placeholder for logo graphic */}
          <div className="hidden md:block"><SearchBar /></div> {/* Web Search Bar, next to logo */}
        </div>

        {/* Mobile Search Bar (visible on mobile only, between logo and hamburger) */}
        <div className="md:hidden flex-grow"><SearchBar /></div>

        {/* Middle Section: Web Navigation (HOME, SHOP) - Centered on desktop */}
        <nav className="hidden md:flex flex-grow justify-center"> {/* Using flex-grow and justify-center to center nav */} 
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-primary transition-colors">HOME</a></li>
            <li><a href="/shop" className="hover:text-primary transition-colors">SHOP</a></li>
          </ul>
        </nav>

        {/* Right Section: Icons for user, heart, cart - Hidden on small screens, shown on medium and larger */}
        <div className="flex items-center space-x-4">
          <a href="/signin" className="hidden md:block hover:text-primary transition-colors">
            <img src="/images/icon-user.svg" alt="User Icon" className="h-5 w-5" />
          </a>
          <a href="/wishlist" className="hidden md:block hover:text-primary transition-colors">
            <img src="/images/icon-heart.svg" alt="Heart Icon" className="h-5 w-5" />
          </a>
          <a href="/cart" className="hidden md:block hover:text-primary transition-colors">
            <img src="/images/icon-bag.svg" alt="Bag Icon" className="h-5 w-5" />
          </a>
        </div>

        <div className="md:hidden">
          {/* Mobile menu icon and menu content */}
          <button className="text-white focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          {isMobileMenuOpen && (
            <div className="absolute top-14 right-0 w-64 h-[calc(100vh-3.5rem)] bg-dark-1 p-4 shadow-lg md:hidden transform transition-transform ease-in-out duration-300 z-50 text-base">
              <ul className="flex flex-col space-y-4 pt-4">
                <li><a href="/" className="block py-2 px-4 hover:bg-dark-2 transition-colors rounded">HOME</a></li>
                <li><a href="/shop" className="block py-2 px-4 hover:bg-dark-2 transition-colors rounded">SHOP</a></li>
                <li>
                  <a href="/signin" className="flex items-center space-x-2 py-2 px-4 hover:bg-dark-2 transition-colors rounded">
                    <img src="/images/icon-user.svg" alt="User Icon" className="h-5 w-5" />
                    <span>Sign in</span>
                  </a>
                </li>
                <li>
                  <a href="/signup" className="flex items-center space-x-2 py-2 px-4 hover:bg-dark-2 transition-colors rounded">
                    <img src="/images/icon-user.svg" alt="User Icon" className="h-5 w-5" />
                    <span>Sign up</span>
                  </a>
                </li>
                <li>
                  <a href="/account" className="flex items-center space-x-2 py-2 px-4 hover:bg-dark-2 transition-colors rounded">
                    <img src="/images/icon-user.svg" alt="User Icon" className="h-5 w-5" />
                    <span>Account Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="/cart" className="flex items-center space-x-2 py-2 px-4 hover:bg-dark-2 transition-colors rounded">
                    <img src="/images/icon-bag.svg" alt="Bag Icon" className="h-5 w-5" />
                    <span>Cart</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 