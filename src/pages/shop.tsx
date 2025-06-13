import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import ShopPageContent from '../components/ShopPageContent';

const Shop: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/server/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <div className="min-h-screen bg-dark-2 text-white font-gordita">
        <ShopPageContent products={products} />
        <Footer />
      </div>
    </>
  );
};

export default Shop; 