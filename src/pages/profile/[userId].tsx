import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// UserProfile type for placeholder
interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  roles: string[];
  products: { id: number; name: string; price: number; image: string }[];
  wishlist: { id: number; name: string; price: number; image: string }[];
}

// Placeholder fetch function (replace with real API call)
const fetchUserProfile = async (userId: string | string[] | undefined): Promise<UserProfile> => {
  // Simulate API response
  return {
    id: typeof userId === 'string' ? userId : 'unknown',
    name: 'Jordan Smith',
    avatar: '/avatar-placeholder.png',
    bio: 'Vintage football enthusiast. Collector and seller of rare boots.',
    rating: 4.8,
    roles: ['buyer', 'seller'], // or ['buyer'], ['seller']
    products: [
      { id: 1, name: 'Adidas Copa', price: 120, image: '/product1.png' },
      { id: 2, name: 'Nike Tiempo', price: 95, image: '/product2.png' },
    ],
    wishlist: [
      { id: 3, name: 'Puma King', price: 110, image: '/product3.png' },
    ],
  };
};

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'shop' | 'wishlist'>('shop');

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId).then(setUser);
    }
  }, [userId]);

  if (!user) return <div className="text-center p-10">Loading profile...</div>;

  const hasBothRoles = user.roles.includes('buyer') && user.roles.includes('seller');
  const isSeller = user.roles.includes('seller');
  const isBuyer = user.roles.includes('buyer');

  return (
    <div className="min-h-screen bg-[#111] text-white font-gordita">
      <div className="max-w-3xl mx-auto py-10">
        {/* User Info */}
        <div className="flex items-center gap-6 mb-8">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-primary" />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="text-gray-400 mb-2">{user.bio}</div>
            <div className="flex items-center gap-2 text-yellow-400">
              <span>★</span>
              <span>{user.rating}</span>
            </div>
          </div>
        </div>
        {/* Toggle for both roles */}
        {hasBothRoles && (
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded ${activeTab === 'shop' ? 'bg-primary text-white' : 'bg-[#232323] text-gray-300'}`}
              onClick={() => setActiveTab('shop')}
            >
              Shop
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'wishlist' ? 'bg-primary text-white' : 'bg-[#232323] text-gray-300'}`}
              onClick={() => setActiveTab('wishlist')}
            >
              Wishlist
            </button>
          </div>
        )}
        {/* Seller Shop */}
        {((isSeller && activeTab === 'shop') || (isSeller && !hasBothRoles)) && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Shop</h2>
            <div className="grid grid-cols-2 gap-6">
              {user.products.map((product) => (
                <div key={product.id} className="bg-[#181818] rounded-lg p-4 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-2 rounded" />
                  <div className="font-medium mb-1">{product.name}</div>
                  <div className="text-primary font-bold">${product.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Buyer Wishlist */}
        {((isBuyer && activeTab === 'wishlist') || (isBuyer && !hasBothRoles)) && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
            <div className="grid grid-cols-2 gap-6">
              {user.wishlist.map((item) => (
                <div key={item.id} className="bg-[#181818] rounded-lg p-4 flex flex-col items-center">
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-cover mb-2 rounded" />
                  <div className="font-medium mb-1">{item.name}</div>
                  <div className="text-primary font-bold">${item.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 