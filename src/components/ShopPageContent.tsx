import React, { useState, useEffect } from 'react';
import ProductCard from './ui/custom/ProductCard';

interface Product {
  id: number;
  imageUrl?: string;
  name: string;
  price: string | number;
}

interface ShopPageContentProps {
  products?: Product[];
}

const allProducts: Product[] = [
  { id: 1, imageUrl: '/images/nike_phantom_elite.png', name: 'Nike Phantom Elite', price: '$275' },
  { id: 2, imageUrl: '/images/adidas_x_speedflow.png', name: 'Adidas X Speedflow', price: '$225' },
  { id: 3, imageUrl: '/images/puma_ultra.png', name: 'Puma Ultra', price: '$199' },
  { id: 4, imageUrl: '/images/nike_tiempo_legend.png', name: 'Nike Tiempo Legend', price: '$229' },
  { id: 5, imageUrl: '/images/adidas_predator.png', name: 'Adidas Predator', price: '$279' },
  { id: 6, imageUrl: '/images/puma_future.png', name: 'Puma Future', price: '$189' },
  { id: 7, imageUrl: '/images/nike_phantom_elite.png', name: 'Nike Phantom Elite 2', price: '$280' },
  { id: 8, imageUrl: '/images/adidas_x_speedflow.png', name: 'Adidas X Speedflow 2', price: '$230' },
  { id: 9, imageUrl: '/images/puma_ultra.png', name: 'Puma Ultra 2', price: '$205' },
  { id: 10, imageUrl: '/images/nike_tiempo_legend.png', name: 'Nike Tiempo Legend 2', price: '$235' },
  { id: 11, imageUrl: '/images/adidas_predator.png', name: 'Adidas Predator 2', price: '$285' },
  { id: 12, imageUrl: '/images/puma_future.png', name: 'Puma Future 2', price: '$195' },
  { id: 13, imageUrl: '/images/nike_phantom_elite.png', name: 'Nike Phantom Elite 3', price: '$290' },
  { id: 14, imageUrl: '/images/adidas_x_speedflow.png', name: 'Adidas X Speedflow 3', price: '$240' },
  { id: 15, imageUrl: '/images/puma_ultra.png', name: 'Puma Ultra 3', price: '$210' },
  { id: 16, imageUrl: '/images/nike_tiempo_legend.png', name: 'Nike Tiempo Legend 3', price: '$245' },
  { id: 17, imageUrl: '/images/adidas_predator.png', name: 'Adidas Predator 3', price: '$295' },
  { id: 18, imageUrl: '/images/puma_future.png', name: 'Puma Future 3', price: '$200' },
];

const PRODUCTS_PER_LOAD = 6; // Number of products to load at once

const ShopPageContent: React.FC<ShopPageContentProps> = ({ products }) => {
  // Use backend products if provided, otherwise fallback to allProducts
  const productList = (products && products.length > 0) ? products : allProducts;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState(productList.slice(0, PRODUCTS_PER_LOAD));
  const [hasMore, setHasMore] = useState(productList.length > PRODUCTS_PER_LOAD);

  const loadMoreProducts = () => {
    const currentLength = loadedProducts.length;
    const nextProducts = productList.slice(currentLength, currentLength + PRODUCTS_PER_LOAD);
    if (nextProducts.length > 0) {
      setLoadedProducts((prevProducts) => [...prevProducts, ...nextProducts]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setLoadedProducts(productList.slice(0, PRODUCTS_PER_LOAD));
    setHasMore(productList.length > PRODUCTS_PER_LOAD);
  }, [productList]);

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
  }, [hasMore, loadedProducts, productList]);

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
            key={product.id || index}
            id={product.id}
            imageUrl={product.imageUrl || '/images/placeholder-avatar.png'}
            name={product.name}
            price={String(product.price)}
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