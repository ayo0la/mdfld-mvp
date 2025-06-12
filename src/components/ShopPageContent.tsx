import React, { useState, useEffect } from 'react';
import ProductCard from './ui/custom/ProductCard';

const allProducts = [
  {
    imageUrl: '/images/nike_phantom_elite.png', // Placeholder image path
    name: 'Nike Phantom Elite',
    price: '$275',
  },
  {
    imageUrl: '/images/adidas_x_speedflow.png', // Placeholder image path
    name: 'Adidas X Speedflow',
    price: '$225',
  },
  {
    imageUrl: '/images/puma_ultra.png', // Placeholder image path
    name: 'Puma Ultra',
    price: '$199',
  },
  {
    imageUrl: '/images/nike_tiempo_legend.png', // Placeholder image path
    name: 'Nike Tiempo Legend',
    price: '$229',
  },
  {
    imageUrl: '/images/adidas_predator.png', // Placeholder image path
    name: 'Adidas Predator',
    price: '$279',
  },
  {
    imageUrl: '/images/puma_future.png', // Placeholder image path
    name: 'Puma Future',
    price: '$189',
  },
  // Duplicate for more products to simulate infinite scroll
  {
    imageUrl: '/images/nike_phantom_elite.png',
    name: 'Nike Phantom Elite 2',
    price: '$280',
  },
  {
    imageUrl: '/images/adidas_x_speedflow.png',
    name: 'Adidas X Speedflow 2',
    price: '$230',
  },
  {
    imageUrl: '/images/puma_ultra.png',
    name: 'Puma Ultra 2',
    price: '$205',
  },
  {
    imageUrl: '/images/nike_tiempo_legend.png',
    name: 'Nike Tiempo Legend 2',
    price: '$235',
  },
  {
    imageUrl: '/images/adidas_predator.png',
    name: 'Adidas Predator 2',
    price: '$285',
  },
  {
    imageUrl: '/images/puma_future.png',
    name: 'Puma Future 2',
    price: '$195',
  },
  {
    imageUrl: '/images/nike_phantom_elite.png',
    name: 'Nike Phantom Elite 3',
    price: '$290',
  },
  {
    imageUrl: '/images/adidas_x_speedflow.png',
    name: 'Adidas X Speedflow 3',
    price: '$240',
  },
  {
    imageUrl: '/images/puma_ultra.png',
    name: 'Puma Ultra 3',
    price: '$210',
  },
  {
    imageUrl: '/images/nike_tiempo_legend.png',
    name: 'Nike Tiempo Legend 3',
    price: '$245',
  },
  {
    imageUrl: '/images/adidas_predator.png',
    name: 'Adidas Predator 3',
    price: '$295',
  },
  {
    imageUrl: '/images/puma_future.png',
    name: 'Puma Future 3',
    price: '$200',
  },
];

const PRODUCTS_PER_LOAD = 6; // Number of products to load at once

const ShopPageContent: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState(allProducts.slice(0, PRODUCTS_PER_LOAD));
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProducts = () => {
    const currentLength = loadedProducts.length;
    const nextProducts = allProducts.slice(currentLength, currentLength + PRODUCTS_PER_LOAD);
    if (nextProducts.length > 0) {
      setLoadedProducts((prevProducts) => [...prevProducts, ...nextProducts]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 && // Load when 100px from bottom
        hasMore
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadedProducts]); // Add loadedProducts to dependencies

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-dark-2 text-white font-gordita">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden p-4 bg-gray-800 flex justify-between items-center">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="text-white py-2 px-4 rounded-md bg-teal-500 hover:bg-teal-600"
        >
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        <span className="text-lg font-bold">Filters</span>
      </div>

      {/* Filter Sidebar */}
      <aside className={`w-full md:w-1/4 p-4 border-r border-gray-700 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
        <h2 className="text-2xl font-bold mb-6">Brands</h2>
        <div className="mb-6">
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            Nike
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            Adidas
          </label>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            Puma
          </label>
        </div>

        <h2 className="text-2xl font-bold mb-6">Price Range</h2>
        <div className="mb-6">
          <input type="range" min="0" max="500" className="w-full" />
          <div className="flex justify-between text-sm mt-2">
            <span>$0</span>
            <span>$500</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Size</h2>
        <div className="grid grid-cols-3 gap-2">
          {[7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12].map((size) => (
            <button key={size} className="bg-gray-700 py-2 rounded text-sm hover:bg-gray-600">
              {size}
            </button>
          ))}
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 p-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {loadedProducts.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
          />
        ))}
        {!hasMore && (
          <div className="col-span-full text-center text-gray-400 py-4">
            No more products to load.
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopPageContent; 