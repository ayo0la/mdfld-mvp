import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ui/custom/ProductCard';

const Home: React.FC = () => {
  const heroImages = [
    '/images/hero-boot.png',
    '/images/hero-boot1.png',
    '/images/hero-boot2.png',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>mdfld-mvp</title>
      </Head>
      <div className="min-h-screen bg-dark-2 text-white font-gordita">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-b from-dark-2 to-dark-1 py-20 px-4 min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 w-full h-full bg-gradient-to-tr from-transparent via-primary/10 to-transparent transform -translate-x-1/2 -skew-y-12 hidden lg:block"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full -mb-48 -mr-48 hidden lg:block"></div>

            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between z-10">
              <img
                src={heroImages[currentImageIndex]}
                alt="Football Boot"
                className="w-[250px] sm:w-[300px] md:w-[450px] lg:w-[550px] xl:w-[650px] h-auto object-contain rotate-[-15deg] z-0 block lg:hidden mx-auto mb-10"
              />
              <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
                <h2 className="text-sm text-primary mb-2">01</h2>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                  DISCOVER THE FINEST <br className="hidden sm:inline" /> FOOTBALL STUFF.
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8">
                  Explore exclusive kits, premium gear, rare memorabilia, and the latest `must-have` products for your football enthusiasts.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="Search for brand, colors, etc."
                    className="w-full sm:w-2/3 p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-primary"
                  />
                  <button className="w-full sm:w-1/3 bg-primary text-gray-900 py-3 px-6 rounded-full font-bold hover:bg-opacity-90 transition-colors" onClick={() => alert('Search button clicked!')}>
                    SEARCH
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
                {/* The boot image will be absolutely positioned outside this div */}
              </div>
              {/* Original image tag, now hidden on small and medium screens, shown only on large screens */}
              <img
                src={heroImages[currentImageIndex]}
                alt="Football Boot"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[300px] md:w-[450px] lg:w-[550px] xl:w-[650px] h-auto object-contain rotate-[-15deg] z-0 hidden lg:block border-0 shadow-none"
              />
            </div>
          </section>

          {/* Game Changers Section */}
          <section className="py-16 px-4 bg-dark-2">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">GAME CHANGERS</h2>
              <p className="text-base md:text-lg text-center text-gray-400 mb-8">Best Of New Arrivals</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <ProductCard imageSrc="/images/product1.png" name="Adidas Football (ID7793)" price="$23.75" productId="product1" />
                <ProductCard imageSrc="/images/product2.png" name="Adidas Unisex TF (ID3784)" price="$24.00" productId="product2" />
                <ProductCard imageSrc="/images/product3.png" name="Adidas Unisex JSY (ID2996)" price="$27.65" productId="product3" />
                <ProductCard imageSrc="/images/product4.png" name="Adidas Football (ID2457)" price="$43.00" productId="product4" />
                <ProductCard imageSrc="/images/product5.png" name="Adidas Unisex FXG (ID654)" price="$17.90" productId="product5" />
                <ProductCard imageSrc="/images/product6.png" name="Adidas M PL 22 Reg T (ID452)" price="$15.60" productId="product6" />
                <ProductCard imageSrc="/images/product7.png" name="Adidas Unisex FXG (ID654)" price="$38.50" productId="product7" />
                <ProductCard imageSrc="/images/product8.png" name="Adidas Men Q4 BKJT (ID542)" price="$20.70" productId="product8" />
              </div>
              <div className="text-center mt-12">
                <button className="bg-primary text-gray-900 py-3 px-8 rounded-full font-bold hover:bg-opacity-90 transition-colors" onClick={() => window.location.href='/shop'}>
                  SHOP
                </button>
              </div>
            </div>
          </section>

          {/* Final Whistle Section */}
          <section className="py-16 px-4 bg-dark-1 text-center relative overflow-hidden">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">FINAL WHISTLE.</h2>
              {/* Placeholder for countdown timer */}
              <div className="flex justify-center space-x-2 sm:space-x-4 text-4xl sm:text-5xl font-bold">
                <span className="bg-gray-700 p-3 sm:p-4 rounded">0</span>
                <span className="bg-gray-700 p-3 sm:p-4 rounded">1</span>
                <span className="bg-gray-700 p-3 sm:p-4 rounded">4</span>
                <span className="bg-gray-700 p-3 sm:p-4 rounded">0</span>
              </div>
              <button className="bg-primary text-gray-900 py-3 px-8 rounded-full font-bold hover:bg-opacity-90 transition-colors mt-12" onClick={() => window.location.href='/shop'}>
                SHOP
              </button>
            </div>
          </section>

          {/* The Lineup Section */}
          <section className="py-16 px-4 bg-dark-2">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">THE LINEUP</h2>
              <p className="text-base md:text-lg text-center text-gray-400 mb-8">Explore everything football - organized for your game.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <ProductCard imageSrc="/images/categories-boots-img.png" name="Shop Shoes" price="" productId="shoes" />
                <ProductCard imageSrc="/images/categories-jerseys-img.png" name="Shop Kits" price="" productId="kits" />
                <ProductCard imageSrc="/images/categories-balls-img.png" name="Shop Footballs" price="" productId="footballs" />
                <ProductCard imageSrc="/images/categories-cards-img.png" name="Shop Cards" price="" productId="cards" />
              </div>
            </div>
          </section>

          {/* Top Sellers Section */}
          <section className="py-16 px-4 bg-dark-1">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">TOP SELLERS</h2>
              <p className="text-base md:text-lg text-center text-gray-400 mb-8">From legendary boots to must-have kits and beyond.</p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
                {/* Placeholder Seller Avatars */}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-gray-700 p-2 sm:p-3 rounded-full">
                    <img src="/images/placeholder-avatar.png" alt="Seller" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                    <span className="text-xs sm:text-sm">Seller Name {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Football Experts Section */}
          <section className="py-16 px-4 bg-dark-2">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 flex justify-center lg:justify-start mb-10 lg:mb-0">
                <img src="/images/ronaldinho-jersey.png" alt="Ronaldinho Jersey" className="max-w-full h-auto lg:max-w-lg" />
              </div>
              <div className="lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">THE FOOTBALL EXPERTS <br className="hidden md:inline" /> YOU CAN RELY ON.</h2>
                <p className="text-base md:text-lg text-gray-400 mb-8">
                  MDFLD is committed to fair play. Through unwavering integrity, a marketplace for you to find authentic, pre-owned, and original sports memorabilia from the world's most trusted sources and enthusiasts.
                </p>
                <button className="bg-primary text-gray-900 py-3 px-8 rounded-full font-bold hover:bg-opacity-90 transition-colors" onClick={() => window.location.href='/about'}>
                  LEARN MORE
                </button>
              </div>
            </div>
          </section>

          {/* The Edge Section */}
          <section className="py-16 px-4 bg-dark-1 text-center">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">THE EDGE</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Shipping Worldwide</h3>
                  <p className="text-gray-400">Description of shipping worldwide.</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Verification Guaranteed</h3>
                  <p className="text-gray-400">Description of verification guaranteed.</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Cost Saving</h3>
                  <p className="text-gray-400">Description of cost saving.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Latest Posts Section */}
          <section className="py-16 px-4 bg-dark-2 text-center relative overflow-hidden">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">LATEST POSTS.</h2>
              <p className="text-base md:text-lg text-gray-400 mb-8">
                Stay up-to-date with the latest news, helpful tips, and exclusive content from the world of football.
                Never miss out on updates, breakdowns, and more as a trusted source for serious players alike!
              </p>
              <button className="bg-primary text-gray-900 py-3 px-8 rounded-full font-bold hover:bg-opacity-90 transition-colors" onClick={() => window.location.href='/blog'}>
                VIEW ALL
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home; 