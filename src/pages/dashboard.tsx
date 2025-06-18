import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';

const SIDEBAR_SECTIONS = {
  forward: [
    { label: 'Orders', key: 'orders' },
    { label: 'Saved Items', key: 'saved' },
    { label: 'Messages', key: 'messages' },
    { label: 'Returns & Disputes', key: 'returns' },
    { label: 'Settings', key: 'settings' },
  ],
  midfielder: [
    { label: 'My Listings', key: 'listings' },
    { label: 'Orders', key: 'orders' },
    { label: 'Messages', key: 'messages' },
    { label: 'Earnings', key: 'earnings' },
    { label: 'Settings', key: 'settings' },
  ],
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!user) return <div className="text-center p-10">Please sign in to view your dashboard.</div>;

  // Use Cognito custom attribute for roles
  const rolesString = user?.attributes?.['custom:roles'] || 'buyer';
  const userRoles = rolesString.split(',').map((r: string) => r.trim());
  const [activeRole, setActiveRole] = useState(userRoles.includes('seller') ? 'midfielder' : 'forward');
  const [activeSection, setActiveSection] = useState('orders');

  const sidebarSections = activeRole === 'midfielder' ? SIDEBAR_SECTIONS.midfielder : SIDEBAR_SECTIONS.forward;

  return (
    <div className="min-h-screen bg-[#111] text-white font-gordita">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-[#222] px-8 py-4 border-b border-[#333]">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="mdfld logo" className="h-8" />
          <span className="text-xl font-bold">
            {activeRole === 'midfielder' ? 'Midfielder Dashboard' : 'Forward Dashboard'}
          </span>
        </div>
        {userRoles.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              className={`px-4 py-2 rounded ${activeRole === 'forward' ? 'bg-primary text-white' : 'bg-[#333] text-gray-300'}`}
              onClick={() => setActiveRole('forward')}
            >
              Forward (FWD)
            </button>
            <button
              className={`px-4 py-2 rounded ${activeRole === 'midfielder' ? 'bg-primary text-white' : 'bg-[#333] text-gray-300'}`}
              onClick={() => setActiveRole('midfielder')}
            >
              Midfielder (MDFLD)
            </button>
          </div>
        )}
      </div>
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#181818] min-h-screen border-r border-[#333] pt-8">
          <nav className="flex flex-col gap-2">
            {sidebarSections.map((section) => (
              <button
                key={section.key}
                className={`text-left px-8 py-3 text-lg font-medium transition ${activeSection === section.key ? 'text-primary border-l-4 border-primary bg-[#232323]' : 'text-gray-300 hover:text-primary'}`}
                onClick={() => setActiveSection(section.key)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-10">
          {/* Placeholder for each section */}
          {activeRole === 'midfielder' && activeSection === 'listings' && <div>My Listings (Seller)</div>}
          {activeRole === 'midfielder' && activeSection === 'orders' && <div>Orders (Seller)</div>}
          {activeRole === 'midfielder' && activeSection === 'messages' && <div>Messages (Seller)</div>}
          {activeRole === 'midfielder' && activeSection === 'earnings' && <div>Earnings (Seller)</div>}
          {activeRole === 'midfielder' && activeSection === 'settings' && <div>Settings (Seller)</div>}

          {activeRole === 'forward' && activeSection === 'orders' && <div>Orders (Buyer)</div>}
          {activeRole === 'forward' && activeSection === 'saved' && <div>Saved Items (Buyer)</div>}
          {activeRole === 'forward' && activeSection === 'messages' && <div>Messages (Buyer)</div>}
          {activeRole === 'forward' && activeSection === 'returns' && <div>Returns & Disputes (Buyer)</div>}
          {activeRole === 'forward' && activeSection === 'settings' && <div>Settings (Buyer)</div>}
        </main>
      </div>
      {/* Footer */}
      <footer className="mt-10 border-t border-[#333] py-8 px-8 flex flex-col items-center text-gray-400">
        <div className="mb-2">CONTACT</div>
        <div className="flex gap-4 mb-2">
          <a href="#" className="hover:text-primary">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-primary">About</a>
          <span>/</span>
          <a href="#" className="hover:text-primary">Products</a>
          <span>/</span>
          <a href="#" className="hover:text-primary">Sale</a>
          <span>/</span>
          <a href="#" className="hover:text-primary">Contact</a>
        </div>
        <div className="mb-2">Email: hello@mdfld.com | Phone: +1 (011) 816 20 30 | Location: New York, NY 10101</div>
        <div className="text-xs">© 2025 MDFLD. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default Dashboard; 