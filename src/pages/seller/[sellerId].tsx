import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../../components/Footer';
import { Star, Users, ShoppingBag, Package, MapPin } from 'lucide-react';
import ProductCard from '../../components/ui/custom/ProductCard';

// Mock sellers data keyed by sellerId
const mockSellers: Record<string, any> = {
  'thebootchamber': {
    name: 'THE BOOT CHAMBER',
    avatar: '/images/thebootchamber-avatar.png',
    rating: 4.9,
    reviews: 109000,
    followers: 109000,
    since: '2015',
    location: 'Peterborough, UK',
    totalSales: 1767,
    avgRating: 4.9,
    productsCount: 16,
    isFollowing: false,
    products: [
      { id: 1, imageUrl: '/images/bootchamber/mercurial_vapor_xvi_ag.jpg', name: 'Nike Mercurial Vapor XVI AG', price: '$245.00' },
      { id: 2, imageUrl: '/images/bootchamber/adidas_x_crazyfast_fg.jpg', name: 'Adidas X Crazyfast+ FG', price: '$245.00' },
      { id: 3, imageUrl: '/images/bootchamber/adidas_predator_touch.jpg', name: 'Adidas Predator Touch', price: '$3,169.00' },
      { id: 4, imageUrl: '/images/bootchamber/nike_mercurial_vapor_xvi_sg.jpg', name: 'Nike Mercurial Vapor XVI SG', price: '$245.00' },
      { id: 5, imageUrl: '/images/bootchamber/adidas_karnivor_sg.jpg', name: 'Adidas Karnivor SG', price: '$145.00' },
      { id: 6, imageUrl: '/images/bootchamber/adidas_predator_rx_abs_sg.jpg', name: 'Adidas Predator RX ABS SG', price: '$109.00' },
      { id: 7, imageUrl: '/images/bootchamber/adidas_f50_ghosted_fg.jpg', name: 'Adidas F50 Ghosted FG', price: '$361.00' },
      { id: 8, imageUrl: '/images/bootchamber/adidas_x_19_1_fg.jpg', name: 'Adidas X 19.1 FG', price: '$332.00' },
      { id: 9, imageUrl: '/images/bootchamber/nike_mercurial_vapor_iv_sl.jpg', name: 'Nike Mercurial Vapor IV SL (Sample)', price: '$1,189.00' },
      { id: 10, imageUrl: '/images/bootchamber/nike_total_90_supremacy_le.jpg', name: 'Nike Total 90 Supremacy LE', price: '$1,225.00' },
      { id: 11, imageUrl: '/images/bootchamber/adidas_adipure_fg.jpg', name: 'Adidas Adipure FG', price: '$332.00' },
      { id: 12, imageUrl: '/images/bootchamber/nike_magista_opus_fg.jpg', name: 'Nike Magista Opus FG', price: '$317.00' },
      { id: 13, imageUrl: '/images/bootchamber/nike_ctr360_maestri_ii_sg.jpg', name: 'Nike CTR360 Maestri II SG', price: '$829.00' },
      { id: 14, imageUrl: '/images/bootchamber/adidas_predator_absolute_sg.jpg', name: 'Adidas Predator Absolute SG', price: '$209.00' },
      { id: 15, imageUrl: '/images/bootchamber/adidas_predator_mutator_20_1_fg.jpg', name: 'Adidas Predator Mutator 20.1 FG', price: '$159.00' },
      { id: 16, imageUrl: '/images/bootchamber/adidas_f50_elite_reborn.jpg', name: 'Adidas F50 Elite Reborn', price: '$317.00' },
    ],
  },
  'liam-carter': {
    name: 'Liam Carter',
    avatar: '',
    rating: 4.9,
    reviews: 238,
    followers: 12400,
    since: 'June 2025',
    location: 'London, United Kingdom',
    totalSales: 1247,
    avgRating: 4.9,
    productsCount: 42,
    isFollowing: false,
    products: [
      { id: 1, imageUrl: '/images/nike_phantom_elite.png', name: 'Nike Mercurial Vapor 15 Elite', price: '$235.00' },
      { id: 2, imageUrl: '/images/adidas_predator.png', name: 'Adidas Football', price: '$23.75' },
      { id: 3, imageUrl: '/images/puma_ultra.png', name: 'Puma Ultra', price: '$39.99' },
      { id: 4, imageUrl: '/images/adidas_x_speedflow.png', name: 'Adidas X Speedflow', price: '$29.99' },
    ],
  },
  'jane-smith': {
    name: 'Jane Smith',
    avatar: '',
    rating: 4.7,
    reviews: 120,
    followers: 8000,
    since: 'March 2023',
    location: 'Berlin, Germany',
    totalSales: 980,
    avgRating: 4.7,
    productsCount: 30,
    isFollowing: false,
    products: [
      { id: 5, imageUrl: '/images/adidas_predator.png', name: 'Adidas Predator', price: '$49.99' },
      { id: 6, imageUrl: '/images/puma_ultra.png', name: 'Puma Ultra', price: '$39.99' },
    ],
  },
};

const SellerProfile: React.FC = () => {
  const router = useRouter();
  const { sellerId } = router.query;
  const seller = sellerId && typeof sellerId === 'string' && mockSellers[sellerId] ? mockSellers[sellerId] : mockSellers['thebootchamber'];
  const [followers, setFollowers] = useState(seller.followers);
  const [isFollowing, setIsFollowing] = useState(seller.isFollowing);
  const [showProducts, setShowProducts] = useState(false);

  const handleFollow = () => {
    setIsFollowing((prev: boolean) => !prev);
    setFollowers((prev: number) => (isFollowing ? prev - 1 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-dark-2 text-white font-gordita flex flex-col">
      {/* Header Section */}
      <div className="bg-dark-1 w-full py-8 px-4 flex flex-col items-center border-b border-gray-800">
        <div className="flex flex-col md:flex-row items-center w-full max-w-5xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-44 h-44 rounded-full bg-gray-800 flex items-center justify-center mb-4 border-4 border-primary overflow-hidden">
              {/* Avatar Placeholder */}
              <span className="text-gray-400 text-2xl">180 × 180</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
              <h1 className="text-3xl font-bold mb-1">{seller.name}</h1>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-primary" /> {seller.rating} ({seller.reviews} reviews)</span>
                <span className="mx-2">·</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {followers.toLocaleString()} followers</span>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className={`bg-primary text-dark-2 px-8 py-2 rounded-full font-bold hover:bg-accent transition-colors ${isFollowing ? 'opacity-70' : ''}`}
                onClick={handleFollow}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Store Info Only */}
      <div className="w-full max-w-5xl mx-auto mt-8 px-4">
        <div className="flex gap-8 border-b border-gray-800 mb-8">
          <button
            className={`pb-3 px-2 font-bold text-lg border-b-2 transition-colors border-primary text-primary`}
            disabled
          >
            Store Info
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 rounded-lg p-8 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-gray-400 text-sm"><Package className="w-5 h-5" /> Signed since {seller.since}</div>
            <div className="flex items-center gap-2 text-gray-400 text-sm"><MapPin className="w-5 h-5" /> {seller.location}</div>
            <div className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer" onClick={() => setShowProducts((v) => !v)}>
              <ShoppingBag className="w-5 h-5" /> {seller.productsCount} Products
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-xs text-gray-400">Total Sales</div>
                <div className="font-bold text-2xl">{seller.totalSales}</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-xs text-gray-400">Average Rating</div>
                <div className="font-bold text-2xl">{seller.avgRating}</div>
              </div>
            </div>
          </div>
          <div
            className="bg-gray-900 rounded-lg p-8 flex flex-col gap-6 items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={() => setShowProducts((v) => !v)}
          >
            <div className="text-5xl font-bold text-primary">{seller.productsCount}</div>
            <div className="text-lg text-gray-400 font-semibold">Products Available</div>
          </div>
        </div>
      </div>
      {showProducts && (
        <div className="w-full max-w-5xl mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-primary">Products by {seller.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {seller.products.map((product: any) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SellerProfile; 