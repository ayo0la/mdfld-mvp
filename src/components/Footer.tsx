import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-1 text-white p-8 mt-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-4">mdfld.</h3>
          {/* Social media icons */}
          <div className="flex justify-center sm:justify-start space-x-4">
            <a href="#" className="hover:text-primary">Facebook</a>
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="#" className="hover:text-primary">Instagram</a>
          </div>
        </div>
        <div className="col-span-1">
          <h4 className="font-bold mb-4">CONTACT</h4>
          <ul>
            <li><a href="#" className="hover:text-primary">Home</a></li>
            <li><a href="#" className="hover:text-primary">Shop</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-bold mb-4"></h4>
          <ul className="space-y-2">
            <li>Email:</li>
            <li>hello@mdfld.co</li>
            <li>Phone No:</li>
            <li>+1 216 996 20 50</li>
            <li>Location:</li>
            <li>Atlanta, GA 30301</li>
          </ul>
        </div>
        <div className="col-span-1 flex justify-center sm:justify-end items-end">
          {/* Back to top button */}
          <button className="bg-primary text-white p-3 rounded-full hover:bg-opacity-90 transition-colors">
            ↑
          </button>
        </div>
      </div>
      <div className="text-center mt-8 text-sm">
        © 2025 MDFLD. All Rights Reserved.
        <ul className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
          <li><a href="#" className="hover:text-primary">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-primary">Sitemap</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer; 