import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from './ui/custom/SearchBar';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
          <Link href="/">
            <img src="/images/mdfld-logo.png" alt="mdfld logo" className="h-24 mr-2 cursor-pointer" />
          </Link>
          <div className="hidden md:block"><SearchBar /></div>  {/* Web Search Bar, next to logo */}
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
          <Link href={user ? "/account" : "/signin"} className="hidden md:block hover:text-primary transition-colors">
            <img src="/images/icon-user.svg" alt="User Icon" className="h-5 w-5" />
          </Link>
          <a href="/wishlist" className="hidden md:block hover:text-primary transition-colors">
            <img src="/images/icon-heart.svg" alt="Heart Icon" className="h-5 w-5" />
          </a>
          <a href="/cart" className="hidden md:block hover:text-primary transition-colors relative">
            <img src="/images/icon-bag.svg" alt="Bag Icon" className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-dark-1 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-dark-1">
                {cartCount}
              </span>
            )}
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
                  <Link href={user ? "/account" : "/signin"} className="flex items-center space-x-2 py-2 px-4 hover:bg-dark-2 transition-colors rounded">
                    <img src="/images/icon-user.svg" alt="User Icon" className="h-5 w-5" />
                    <span>Account</span>
                  </Link>
                </li>
                <li>
                  <a href="/cart" className="flex items-center space-x-2 py-2 px-4 hover:bg-dark-2 transition-colors rounded relative">
                    <img src="/images/icon-bag.svg" alt="Bag Icon" className="h-5 w-5" />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-dark-1 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-dark-1">
                        {cartCount}
                      </span>
                    )}
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