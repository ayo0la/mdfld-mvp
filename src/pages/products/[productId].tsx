import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Footer from '../../components/Footer';
import { useCart } from '../../hooks/useCart';

const allProducts = [
  { id: 1, name: 'Nike Mercurial Vapor 15 Elite', price: 235.0, oldPrice: 275.0, imageUrl: '/images/nike_phantom_elite.png', description: 'The Nike Mercurial Vapor 15 Elite takes speed to the next level. The innovative plate provides instant acceleration, while the specialized texture across the upper helps you maintain control at high speeds.' },
  { id: 2, name: 'Adidas Football', price: 23.75, imageUrl: '/images/adidas_predator.png', oldPrice: 29.99, description: 'Adidas Football description.' },
  { id: 3, name: 'Puma Ultra', price: 39.99, imageUrl: '/images/puma_ultra.png', oldPrice: 49.99, description: 'Puma Ultra description.' },
  { id: 4, name: 'Adidas X Speedflow', price: 29.99, imageUrl: '/images/adidas_x_speedflow.png', oldPrice: 39.99, description: 'Adidas X Speedflow description.' },
];

const relatedProducts = [
  { id: 5, name: 'Nike Pro Elite Jersey', price: 69.99, oldPrice: 119.99, imageUrl: 'https://placehold.co/300x300' },
  { id: 6, name: 'Nike Pro Elite Jersey', price: 69.99, oldPrice: 119.99, imageUrl: 'https://placehold.co/300x300' },
  { id: 7, name: 'Nike Pro Elite Jersey', price: 69.99, oldPrice: 119.99, imageUrl: 'https://placehold.co/300x300' },
  { id: 8, name: 'Nike Pro Elite Jersey', price: 69.99, oldPrice: 119.99, imageUrl: 'https://placehold.co/300x300' },
];

const sizes = [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
const colors = ['#1abc9c', '#e74c3c', '#2980b9', '#8e44ad', '#222'];

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<number>(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [tab, setTab] = useState('Description');
  const { addToCart } = useCart();

  useEffect(() => {
    if (productId) {
      const found = allProducts.find(p => p.id === Number(productId));
      setProduct(found || null);
    }
  }, [productId]);

  return (
  <>
    <Head>
        <title>{product ? product.name : 'Product Not Found'} | Product Detail</title>
    </Head>
    <div className="min-h-screen bg-dark-2 text-white font-gordita">
        <main className="container mx-auto py-10 px-4">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-400 mb-6">
            <span className="hover:text-primary cursor-pointer">Home</span> / <span className="hover:text-primary cursor-pointer">Boots</span> / <span className="text-white">{product?.name}</span>
          </nav>
          {product ? (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Image Gallery */}
              <div className="flex flex-col lg:flex-row gap-6 flex-1">
                <div className="flex flex-row lg:flex-col gap-2 order-2 lg:order-1">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="bg-gray-700 flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 text-gray-400 text-xs border border-gray-600">800 × 1200</div>
                  ))}
                </div>
                <div className="flex-1 order-1 lg:order-2 flex items-center justify-center">
                  <div className="bg-gray-700 flex items-center justify-center w-full max-w-md h-[400px] lg:h-[600px] text-4xl text-gray-400 border border-gray-600">800 × 1200</div>
                </div>
              </div>
              {/* Product Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-dark-1 text-xs font-bold px-3 py-1 rounded-full">New</span>
                  <span className="bg-gray-700 text-primary text-xs font-bold px-3 py-1 rounded-full">Verified</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-semibold">4.8</span>
                  <span className="text-xs text-gray-400">(256 Reviews)</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  <span className="text-lg line-through text-gray-400">${product.oldPrice?.toFixed(2) || (product.price * 1.15).toFixed(2)}</span>
                  <span className="text-green-400 font-semibold">Save 15%</span>
                </div>
                {/* Size Selector */}
                <div className="mb-6">
                  <div className="mb-1 text-sm">Select Size</div>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map(size => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded border ${selectedSize === size ? 'bg-primary text-dark-1 border-primary' : 'bg-gray-700 text-white border-gray-600'} font-bold mb-2`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className="bg-primary text-dark-1 px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors w-full mb-6"
                  onClick={() => {
                    if (product) {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        size: selectedSize,
                      });
                    }
                  }}
                >
                  Add to Cart
                </button>
                {/* Seller Info */}
                <a href="/seller/mdfld-official-store" className="block bg-gray-800 rounded-lg p-4 flex items-center gap-4 mb-8 border border-gray-700 hover:bg-gray-700 transition">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold">M</div>
                  <div>
                    <div className="font-bold underline">MDFLD Official Store</div>
                    <div className="text-xs text-primary font-semibold">Verified Seller</div>
                    <div className="text-xs text-gray-400 mt-1">Official MDFLD store with 100% authentic products</div>
                  </div>
                </a>
              </div>
            </div>
          ) : (
            <div className="text-2xl text-red-500 font-bold">Product not found.</div>
          )}

          {/* Tabs Section */}
          {product && (
            <div className="mt-12">
              <div className="flex gap-8 border-b border-gray-700 mb-4">
                {['Description', 'Details'].map(t => (
                  <button key={t} onClick={() => setTab(t)} className={`pb-2 px-2 text-lg font-bold ${tab === t ? 'border-b-2 border-primary text-primary' : 'text-gray-400'}`}>{t}</button>
                ))}
              </div>
              <div className="text-gray-300 text-base min-h-[60px]">
                {tab === 'Description' && (
                  <p>{product.description}</p>
                )}
                {tab === 'Details' && (
                  <p>Material: Synthetic<br />Weight: 210g<br />Made in: Vietnam</p>
                )}
              </div>
            </div>
          )}

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <div key={rp.id} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                  <img src={rp.imageUrl} alt={rp.name} className="mb-3 rounded w-32 h-32 object-cover" />
                  <div className="font-semibold mb-1">{rp.name}</div>
                  <div className="text-primary font-bold">${rp.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-400 line-through">${rp.oldPrice.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
      </main>
      <Footer />
    </div>
  </>
);
};

export default ProductDetail; 